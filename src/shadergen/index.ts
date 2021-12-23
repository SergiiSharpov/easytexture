// import crc32 from 'crc-32';
import { getBaseMaterial } from '../utils/simpleShaderMaterial';


Set.prototype.get = function( idx ) {
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
};


const FragmentHeaderShader = ( `
precision mediump float;
precision mediump int;
` ).trim();

const FragmentBeforeMainShader = ( `
void main()	{
` ).trim();

const FragmentAfterMainShader = ( `
}
` ).trim();


export class ShaderGraph {
  // inputNodes = {};
  constructor() {
    // this.inputNodes = {};
    this.nodes = {};
    this.dependencies = [];
    this.outNode = null;

    this._processed = {};
    this.ordered = new Set();
  }

  setOutNodeFromTree( tree ) {
    for ( let node of tree ) {
      if ( node.constructor.type === 'out' ) {
        this.outNode = node;
        break;
      }
    }
  }

  processNode( node ) {
    console.log( 'type', node.constructor.type );
    if ( !node.constructor.type ) {
      this.dependencies.push( node );

      return false;
    }

    this.nodes[ node.id ] = node;

    this._processed[ node.id ] = {
      origin: node,
      dependencies: new Set()
    };
  }

  getNodeById( id ) {
    for ( let node of Object.values( this.nodes ) ) {
      if ( node.id === id ) {
        return node;
      }
    }

    return null;
  }

  markDependent() {
    for ( let dep of this.dependencies ) {
      if ( this._processed[ dep.target ] ) {
        this._processed[ dep.target ].dependencies.add( dep.source );
      }
    }
  }

  traverseReadyNodes( targetNode, nodesInPlace ) {
    let processed = 0;

    for ( let dependKey of this._processed[ targetNode.id ].dependencies ) {
      processed += this.traverseReadyNodes( this.getNodeById( dependKey ), nodesInPlace );
    }

    // Has no dependencies
    if ( this._processed[ targetNode.id ].dependencies.size === 0 ) {
      if ( !nodesInPlace.has( targetNode.id ) ) {
        nodesInPlace.add( targetNode.id );
        this.ordered.add( targetNode );
      }
    } else {
      // Check if dependencies in place
      if ( targetNode.depsInPlace( nodesInPlace ) ) {
        if ( !nodesInPlace.has( targetNode.id ) ) {
          nodesInPlace.add( targetNode.id );
          this.ordered.add( targetNode );
        }
      }
    }

    return processed;
  }

  reorder() {
    const inPlace = new Set();

    let shouldTraverse = true;
    while ( shouldTraverse ) {
      const traverseResult = this.traverseReadyNodes( this.outNode, inPlace );

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

  compileTree( tree ) {
    this.nodes = {};
    this.dependencies = [];
    this.outNode = null;

    this._processed = {};
    this.ordered.clear();

    this.setOutNodeFromTree( tree );
    if ( !this.outNode ) {
      console.error( 'Graph doesn\'t has an output node' );

      return false;
    }

    // Get input nodes + get nodes flat object with names
    for ( let node of tree ) {
      this.processNode( node );
      if ( node.constructor.type ) {
        if ( !node.isValid() ) {
          console.log( 'Tree isn\'t valid' );

          return false;
        }
      }
    }

    this.markDependent();

    return this.reorder( this.outNode );
  }

  getNodeNameById( id ) {
    for ( let node of Object.values( this.nodes ) ) {
      if ( node.id === id ) {
        return node.id;
      }
    }

    return null;
  }

  getNodeDepName( node, depIndex ) {
    return this.getNodeNameById( this._processed[ node.id ].dependencies.get( depIndex ) );
  }

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

  updateGraph( graph ) {
    if ( this.compileTree( [...graph.children, ...graph.connections] ) ) {
      const shaderInfo = this.getShaderInfo();

      const material = getBaseMaterial();

      material.uniforms = shaderInfo.uniforms;
      material.fragmentShader = shaderInfo.fragmentShader;

      material.needsUpdate = true;
      material.uniformsNeedUpdate = true;

      graph.material.set( material );
    } else {
      const material = getBaseMaterial();
      graph.material.set( material );
    }

    console.log( graph.material );
  }
}

const graph = new ShaderGraph();

const compile = ( tree, material ) => {
  graph.compileTree( tree );
  let shaderInfo = graph.getShaderInfo();

  material.uniforms = shaderInfo.uniforms;
  material.fragmentShader = shaderInfo.fragmentShader;
};

export default compile;
