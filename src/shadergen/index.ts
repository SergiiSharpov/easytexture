// import crc32 from 'crc-32';
import BaseNode from 'src/graph/baseNode';
import { model, node } from 'src/graph/nodes/types';
import Tree from 'src/store/tree';
import Connection from 'src/store/tree/connection';
import { getBaseMaterial } from '../utils/simpleShaderMaterial';
class CustomSet extends Set {
  get( idx: number ) {
    if( typeof idx !== 'number' ) {
      throw new TypeError( `Argument idx must be a Number. Got [${ idx }]` );
    }

    let i = 0;
    for( let iter = this.keys(), curs = iter.next(); !curs.done; curs = iter.next(), i++ ) {
      if( idx === i ) {
        return curs.value;
      }
    }

    throw new RangeError( `Index [${ idx }] is out of range [0-${ i - 1 }]` );
  }
}


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


export class ShaderGraph {
  ordered: CustomSet;

  private _processed:{
    [key:string]: {
      origin: model;
      dependencies: CustomSet;
    }
  } = {};

  dependencies: Connection[];

  nodes: {[key: string]: model};

  constructor() {
    this.nodes = {};
    this.dependencies = [];
    this._processed = {};
    this.ordered = new CustomSet();
  }

  setOutNodeFromTree( tree: ( model | Connection )[] ) {
    for ( let node of tree ) {
      if ( ( node.constructor as typeof BaseNode ).type === 'out' ) {
        return node as model;
      }
    }

    return null;
  }

  processNode( node: node ) {
    console.log( 'type', node.constructor.type );
    if ( !node.constructor.type ) {
      this.dependencies.push( node as Connection );

      return false;
    }

    this.nodes[ node.id ] = node as model;

    this._processed[ node.id ] = {
      origin: node as model,
      dependencies: new CustomSet()
    };

    return true;
  }

  getNodeById( id: string ) {
    for ( let node of Object.values( this.nodes ) ) {
      if ( node.id === id ) {
        return node;
      }
    }

    return null;
  }

  markDependent() {
    for ( let dep of this.dependencies ) {
      if ( this._processed[ dep.target as string ] ) {
        this._processed[ dep.target as string ].dependencies.add( dep.source );
      }
    }
  }

  traverseReadyNodes( targetNode : model, nodesInPlace: CustomSet ) {
    let processed = 0;

    for ( let dependKey of this._processed[ targetNode.id ].dependencies ) {
      processed += this.traverseReadyNodes( this.getNodeById( dependKey ) as model, nodesInPlace );
    }

    // Has no dependencies
    if ( this._processed[ targetNode.id ].dependencies.size === 0 ) {
      if ( !nodesInPlace.has( targetNode.id ) ) {
        nodesInPlace.add( targetNode.id );
        this.ordered.add( targetNode );
      }
    } else
    // Check if dependencies in place
    if ( targetNode.depsInPlace( nodesInPlace ) ) {
      if ( !nodesInPlace.has( targetNode.id ) ) {
        nodesInPlace.add( targetNode.id );
        this.ordered.add( targetNode );
      }
    }

    return processed;
  }

  reorder( outNode: model ) {
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

  compileElements( tree : ( model | Connection )[] ) {
    this.nodes = {};
    this.dependencies = [];
    // let outNode: model | null = null;

    this._processed = {};
    this.ordered.clear();

    let outNode = this.setOutNodeFromTree( tree );
    if ( !outNode ) {
      console.error( 'Graph doesn\'t have an output node' );

      return false;
    }

    // Get input nodes + get nodes flat object with names
    for ( let node of tree ) {
      this.processNode( node );
      if ( ( node.constructor as typeof BaseNode ).type ) {
        if ( !( node as model ).isValid() ) {
          console.log( 'Tree isn\'t valid' );

          return false;
        }
      }
    }

    this.markDependent();

    return this.reorder( outNode );
  }

  getNodeNameById( id: string ) {
    for ( let node of Object.values( this.nodes ) ) {
      if ( node.id === id ) {
        return node.id;
      }
    }

    return null;
  }

  // getNodeDepName( node, depIndex ) {
  //   return this.getNodeNameById( this._processed[ node.id ].dependencies.get( depIndex ) );
  // }

  getShaderInfo() {
    let info = {
      uniforms: {},
      fragmentShader: ''
    };

    let uniformBlock = '';
    let mainBlock = '';


    for ( let node of this.ordered ) {
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

  updateTree( tree: Tree ) {
    const material = getBaseMaterial();

    if ( this.compileElements( [...tree.children, ...tree.connections] ) ) {
      const shaderInfo = this.getShaderInfo();
      material.uniforms = shaderInfo.uniforms;
      material.fragmentShader = shaderInfo.fragmentShader;
      material.needsUpdate = true;
      material.uniformsNeedUpdate = true;
    }

    tree.material.set( material );
    console.log( tree.material );
  }
}

// const graph = new ShaderGraph();

// const compile = ( tree, material ) => {
//   graph.compileTree( tree );
//   let shaderInfo = graph.getShaderInfo();

//   material.uniforms = shaderInfo.uniforms;
//   material.fragmentShader = shaderInfo.fragmentShader;
// };

// export default compile;
