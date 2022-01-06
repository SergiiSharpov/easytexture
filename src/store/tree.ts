import { makeObservable, observable, computed, action, makeAutoObservable } from 'mobx';
import { RawShaderMaterial, Vector2 } from 'three';
import { Model, Models, graphNodeType, Nodes } from 'graph';
import { CustomSet } from 'utils/customSet';
import IDGenerator from 'utils/idGenerator';
import { getBaseMaterial } from 'utils/simpleShaderMaterial';
import Connection, { _IConnectionProps } from './connection';
const FragmentHeaderShader = ( `
precision mediump float;
precision mediump int;
` ).trim();

const FragmentBeforeMainShader = ( `
void main() {
` ).trim();

const FragmentAfterMainShader = ( `
}
` ).trim();
interface IShaderCreatable {
  material: {
    value: RawShaderMaterial;
    set( material: RawShaderMaterial ): void;
  }
  compile():void;
  getShaderInfo():{
    uniforms: object;
    fragmentShader: string;
  }
}

class Tree
implements IShaderCreatable {
  nodes : Model[] = [];

  connections: Connection[] = [];

  ids : {[key in graphNodeType] : IDGenerator};

  private _ordered = new CustomSet();

  // private _dependencies: Connection[] = [];

  private _processed = {} as {
    [key:string]: {
      origin: Model;
      dependencies: CustomSet;
    }
  };

  material = makeAutoObservable( {
    value: getBaseMaterial(),
    set( material: RawShaderMaterial ) {
      this.value = material;
    }
  } );

  // materialKey = makeAutoObservable( {
  //   value: '',
  //   setValue( value: string ) {
  //     this.value = value;
  //   }
  // } );

  constructor() {
    makeObservable( this, {
      nodes: observable,
      connections: observable,
      flat: computed,
      createNode: action,
      removeNode: action,
      connect: action,
      disconnect: action,
      onConnect: action
    } );
    this.ids = {} as {[key in graphNodeType] : IDGenerator};

    this.createNode( Nodes.out.type, {} );
  }

  hasConnection( props: _IConnectionProps ) {
    for ( let conn of this.connections ) {
      if ( conn.equals( props ) ) {
        return true;
      }
    }

    return false;
  }

  getConnectionByTarget( props: _IConnectionProps ) {
    for ( let conn of this.connections ) {
      if ( conn.target === props.target && conn.targetHandle === props.targetHandle ) {
        return conn;
      }
    }

    return null;
  }

  getNodeById( id: string ) {
    for ( let node of this.nodes ) {
      if ( node.id === id ) {
        return node;
      }
    }

    return null;
  }

  getOutNode( ) {
    for ( let node of this.nodes ) {
      if ( ( node as Model ).type === Nodes.out.type ) {
        return node as Model;
      }
    }

    return null;
  }

  getNodeNameById( id: string ) {
    for ( let node of this.nodes ) {
      if ( node.id === id ) {
        return node.id;
      }
    }

    return null;
  }

  onConnect = ( props: _IConnectionProps ) => {
    if ( this.hasConnection( props ) ) {
      return false;
    }

    const connectionToDelete = this.getConnectionByTarget( props );
    if ( connectionToDelete ) {
      this.disconnect( connectionToDelete.id );
    }

    this.connect( props );

    return true;
    // this.connect(props.target, props.targetHandle || null, props.source, props.sourceHandle || null);
  }

  connect( props: _IConnectionProps ) {
    const connection = new Connection( props );
    connection.id = `#c_${ props.target }${ props.targetHandle || '' }_${ props.source }${ props.sourceHandle || '' }`;

    this.connections.push( connection );

    this.compile();
  }

  disconnect( connectionId: string ) {
    this.connections = this.connections.filter( ( conn ) => ( conn.id !== connectionId ) );

    this.compile();
  }

  createNode( nodeType : graphNodeType, { x = 0, y = 0 } ) {
    console.log( Models );
    if ( Models[ nodeType ] ) {
      const NodeConstructor = Models[ nodeType ];

      if ( !this.ids[ nodeType ] ) {
        this.ids[ nodeType ] = new IDGenerator();
      }

      const id = `${ nodeType }_${ this.ids[ nodeType ].next }`;
      const node = new NodeConstructor( { id, position: new Vector2( x, y ), type: nodeType } );
      node.tree = this;

      this.nodes.push( node );
    }
  }

  removeNode( type: graphNodeType, id: string ) {
    if ( type === Nodes.out.type ) {
      return false;
    }

    this.nodes = this.nodes.filter( ( child ) => ( child.id !== id ) );
    this.connections = this.connections.filter( ( conn ) => ( conn.target !== id ) && ( conn.source !== id ) );

    this.compile();

    return true;
  }

  getNodeConnections( id: string ) {
    const inputs : {[key: string]: Connection } = {};
    for ( let conn of this.connections ) {
      if ( conn.source !== id ) {
        inputs[ conn.sourceHandle ] = conn;
      }
    }

    return inputs;
  }

  get flat() {
    let result = [];

    for ( let child of this.nodes ) {
      result.push( child.flat );
    }

    for ( let conn of this.connections ) {
      result.push( conn.flat );
    }

    return result;
  }

  compile() {
    const material = getBaseMaterial();

    if ( this.compileElements() ) {
      const shaderInfo = this.getShaderInfo();
      material.uniforms = shaderInfo.uniforms;
      material.fragmentShader = shaderInfo.fragmentShader;
      material.needsUpdate = true;
      material.uniformsNeedUpdate = true;
    }

    console.log( material );

    this.material.set( material );
  }

  compileElements() {
    // this._dependencies = [];
    this._processed = {} as {
      [key:string]: {
        origin: Model;
        dependencies: CustomSet;
      }
    };
    this._ordered.clear();

    const outNode = this.getOutNode();
    if ( !outNode ) {
      console.error( 'Graph doesn\'t have an output node' );

      return false;
    }

    for ( let node of this.nodes ) {
      this.processNode( node );
      if ( !node.isValid( ) ) {
        console.log( 'Tree isn\'t valid' );

        return false;
      }
    }

    // for ( let connection of this.connections ) {
    //   this.processConnection( connection );
    // }


    this.markDependent();

    return this.reorder( outNode );
  }

  getShaderInfo() {
    let info = {
      uniforms: {},
      fragmentShader: ''
    };

    let uniformBlock = '';
    let mainBlock = '';


    for ( let node of this._ordered ) {
      uniformBlock += node.getFragmentHeader( info.uniforms );
      mainBlock += node.getFragmentBody();
    }

    info.fragmentShader = [
      FragmentHeaderShader,
      uniformBlock,
      FragmentBeforeMainShader,
      mainBlock,
      FragmentAfterMainShader
    ].join( '\n' );

    return info;
  }

  processNode( node: Model ) {
    this._processed[ node.id ] = {
      origin: node,
      dependencies: new CustomSet()
    };
  }

  processConnection( /* connection: Connection*/ ) {
    //   this._dependencies.push( connection as Connection );
  }

  markDependent() {
    // for ( let dep of this._dependencies ) {
    for ( let dep of this.connections ) {
      if ( this._processed[ dep.target as string ] ) {
        this._processed[ dep.target as string ].dependencies.add( dep.source );
      }
    }
  }

  traverseReadyNodes( targetNode : Model, nodesInPlace: CustomSet ) {
    let processed = 0;

    for ( let dependKey of this._processed[ targetNode.id ].dependencies ) {
      processed += this.traverseReadyNodes( this.getNodeById( dependKey ) as Model, nodesInPlace );
    }

    // Has no dependencies
    if ( this._processed[ targetNode.id ].dependencies.size === 0 ) {
      if ( !nodesInPlace.has( targetNode.id ) ) {
        nodesInPlace.add( targetNode.id );
        this._ordered.add( targetNode );
      }
    } else
    // Check if dependencies in place
    if ( targetNode.isDepsPresent( nodesInPlace ) ) {
      if ( !nodesInPlace.has( targetNode.id ) ) {
        nodesInPlace.add( targetNode.id );
        this._ordered.add( targetNode );
      }
    }

    return processed;
  }

  reorder( outNode: Model ) {
    const inPlace = new CustomSet();

    let shouldTraverse = Boolean( outNode );
    while ( shouldTraverse ) {
      const traverseResult = this.traverseReadyNodes( outNode, inPlace );

      if ( traverseResult === 0 ) {
        console.log( 'Success!' );
        shouldTraverse = false;
      } else if ( traverseResult === -1 ) {
        console.log( 'Fail! Not enough nodes' );
        shouldTraverse = false;

        return false;
      }
    }

    return true;
  }
}

export default Tree;
