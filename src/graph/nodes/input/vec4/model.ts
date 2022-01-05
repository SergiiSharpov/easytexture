import { makeAutoObservable } from 'mobx';
// import { graphNodeType } from 'src/graph';
import { Vector4 } from 'three';

// import { GraphNodes } from '../../../const';
import BaseNode from '../../../baseNode';

class Vec4Model extends BaseNode {
  // type: graphNodeType= 'vec4';

  value = makeAutoObservable( new Vector4() );

  // constructor( ...props ) {
  //   super( ...props );
  // }

  // static type = GraphNodes.Vector4.type;

  getFragmentHeader( uniforms ) {
    uniforms[ this.id ] = { value: this.value };

    console.log( uniforms[ this.id ].value.x, uniforms[ this.id ].value.y, uniforms[ this.id ].value.z );

    return `uniform ${ this.type } ${ this.id };\n`;
  }
}

export default Vec4Model;
