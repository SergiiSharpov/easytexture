import { makeObservable, observable, computed, action, makeAutoObservable } from 'mobx';
import { RawShaderMaterial, Vector2 } from 'three';
import { Model, Models, graphNodeType, Nodes } from '../../graph';
import { ShaderGraph } from '../../shadergen';
import IDGenerator from '../../utils/idGenerator';
import { getBaseMaterial } from '../../utils/simpleShaderMaterial';
import Connection, { _IConnectionProps } from './connection';

class Tree {
  children : Model[] = [];

  connections: Connection[] = [];

  ids : {[key in graphNodeType] : IDGenerator};

  material = makeAutoObservable( {
    value: getBaseMaterial(),
    set( material: RawShaderMaterial ) {
      this.value = material;
    }
  } );

  compiler = new ShaderGraph();

  materialKey = makeAutoObservable( {
    value: '',
    setValue( value: string ) {
      this.value = value;
    }
  } );

  constructor() {
    makeObservable( this, {
      children: observable,
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

  // target, targetHandle, source, sourceHandle
  connect( props: _IConnectionProps ) {
    const connection = new Connection( props );
    connection.id = `#c_${ props.target }${ props.targetHandle || '' }_${ props.source }${ props.sourceHandle || '' }`;

    this.connections.push( connection );

    this.compiler.updateTree( this );
  }

  disconnect( connectionId: string ) {
    this.connections = this.connections.filter( ( conn ) => ( conn.id !== connectionId ) );

    this.compiler.updateTree( this );
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

      this.children.push( node );
    }
  }

  removeNode( type: graphNodeType, id: string ) {
    if ( type === Nodes.out.type ) {
      return false;
    }

    this.children = this.children.filter( ( child ) => ( child.id !== id ) );
    this.connections = this.connections.filter( ( conn ) => ( conn.target !== id ) && ( conn.source !== id ) );

    this.compiler.updateTree( this );

    return true;
  }

  getConnected( id: string ) {
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

    for ( let child of this.children ) {
      result.push( child.flat );
    }

    for ( let conn of this.connections ) {
      result.push( conn.flat );
    }

    return result;
  }
}

export default Tree;
