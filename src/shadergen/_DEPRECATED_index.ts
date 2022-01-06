// // import crc32 from 'crc-32';
// // import BaseNode from 'src/graph/baseNode';
// import { Model, Nodes } from 'src/graph';
// import Tree from 'src/store/tree';
// import Connection from 'src/store/tree/connection';
// import { getBaseMaterial } from 'utils/simpleShaderMaterial';
// export class CustomSet extends Set {
//   get( idx: number ) {
//     if( typeof idx !== 'number' ) {
//       throw new TypeError( `Argument idx must be a Number. Got [${ idx }]` );
//     }

//     let i = 0;
//     for( let iter = this.keys(), curs = iter.next(); !curs.done; curs = iter.next(), i++ ) {
//       if( idx === i ) {
//         return curs.value;
//       }
//     }

//     throw new RangeError( `Index [${ idx }] is out of range [0-${ i - 1 }]` );
//   }
// }


// const FragmentHeaderShader = ( `
// precision mediump float;
// precision mediump int;
// ` ).trim();

// const FragmentBeforeMainShader = ( `
// void main() {
// ` ).trim();

// const FragmentAfterMainShader = ( `
// }
// ` ).trim();


// export class ShaderGraph {
//   ordered= new CustomSet();

//   private _processed:{
//     [key:string]: {
//       origin: Model;
//       dependencies: CustomSet;
//     }
//   } = {};

//   dependencies: Connection[];

//   nodes: {[key: string]: Model};

//   constructor() {
//     this.nodes = {};
//     this.dependencies = [];
//     this._processed = {};
//   }

//   setOutNodeFromTree( tree: ( Model | Connection )[] ) {
//     for ( let node of tree ) {
//       if ( ( node as Model ).type === Nodes.out.type ) {
//         return node as Model;
//       }
//     }

//     return null;
//   }

//   processNode( node: Model | Connection ) {
//     console.log( 'type', ( node as Model ).type );
//     if ( !( node as Model ).type ) {
//       this.dependencies.push( node as Connection );

//       return false;
//     }

//     this.nodes[ node.id ] = node as Model;

//     this._processed[ node.id ] = {
//       origin: node as Model,
//       dependencies: new CustomSet()
//     };

//     return true;
//   }

//   getNodeById( id: string ) {
//     for ( let node of Object.values( this.nodes ) ) {
//       if ( node.id === id ) {
//         return node;
//       }
//     }

//     return null;
//   }

//   markDependent() {
//     for ( let dep of this.dependencies ) {
//       if ( this._processed[ dep.target as string ] ) {
//         this._processed[ dep.target as string ].dependencies.add( dep.source );
//       }
//     }
//   }

//   traverseReadyNodes( targetNode : Model, nodesInPlace: CustomSet ) {
//     let processed = 0;

//     for ( let dependKey of this._processed[ targetNode.id ].dependencies ) {
//       processed += this.traverseReadyNodes( this.getNodeById( dependKey ) as Model, nodesInPlace );
//     }

//     // Has no dependencies
//     if ( this._processed[ targetNode.id ].dependencies.size === 0 ) {
//       if ( !nodesInPlace.has( targetNode.id ) ) {
//         nodesInPlace.add( targetNode.id );
//         this.ordered.add( targetNode );
//       }
//     } else
//     // Check if dependencies in place
//     if ( targetNode.isDepsPresent( nodesInPlace ) ) {
//       if ( !nodesInPlace.has( targetNode.id ) ) {
//         nodesInPlace.add( targetNode.id );
//         this.ordered.add( targetNode );
//       }
//     }

//     return processed;
//   }

//   reorder( outNode: Model ) {
//     const inPlace = new CustomSet();

//     let shouldTraverse = Boolean( outNode );
//     while ( shouldTraverse ) {
//       const traverseResult = this.traverseReadyNodes( outNode, inPlace );

//       if ( traverseResult === 0 ) {
//         console.log( 'Success!' );
//         shouldTraverse = false;
//       } else if ( traverseResult === -1 ) {
//         console.log( 'Fail! Not enough nodes' );
//         shouldTraverse = false;

//         return false;
//       }
//     }

//     return true;
//   }

//   compileElements( tree : ( Model | Connection )[] ) {
//     const nodes = {};
//     const connections = [];

//     this._processed = {};
//     this.ordered.clear();

//     let outNode = this.setOutNodeFromTree( tree );
//     if ( !outNode ) {
//       console.error( 'Graph doesn\'t have an output node' );

//       return false;
//     }

//     // Get input nodes + get nodes flat object with names
//     for ( let node of tree ) {
//       this.processNode( node );
//       if ( ( node as Model ).type ) {
//         if ( !( node as Model ).isValid( ) ) {
//           console.log( 'Tree isn\'t valid' );

//           return false;
//         }
//       }
//     }

//     this.markDependent();

//     return this.reorder( outNode );
//   }

//   getNodeNameById( id: string ) {
//     for ( let node of Object.values( this.nodes ) ) {
//       if ( node.id === id ) {
//         return node.id;
//       }
//     }

//     return null;
//   }

//   getShaderInfo() {
//     let info = {
//       uniforms: {},
//       fragmentShader: ''
//     };

//     let uniformBlock = '';
//     let mainBlock = '';


//     for ( let node of this.ordered ) {
//       uniformBlock += node.getFragmentHeader( info.uniforms );
//       mainBlock += node.getFragmentBody();
//     }

//     info.fragmentShader = [
//       FragmentHeaderShader,
//       uniformBlock,
//       FragmentBeforeMainShader,
//       mainBlock,
//       FragmentAfterMainShader
//     ].join( '\n' );

//     return info;
//   }

//   compile() {
//     const material = getBaseMaterial();

//     if ( this.compileElements( ) ) {
//       const shaderInfo = this.getShaderInfo();
//       material.uniforms = shaderInfo.uniforms;
//       material.fragmentShader = shaderInfo.fragmentShader;
//       material.needsUpdate = true;
//       material.uniformsNeedUpdate = true;
//     }

//     console.log( material );

//     return material;
//   }
// }
