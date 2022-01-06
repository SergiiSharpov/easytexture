import { makeAutoObservable } from 'mobx';
import { Vector4 } from 'three';
import BaseNode from 'graph/baseNode';

class Vec4Model extends BaseNode {
  value = makeAutoObservable( new Vector4() );

  getFragmentHeader( uniforms ) {
    uniforms[ this.id ] = { value: this.value };

    console.log( uniforms[ this.id ].value.x, uniforms[ this.id ].value.y, uniforms[ this.id ].value.z );

    return `uniform ${ this.type } ${ this.id };\n`;
  }
}

export default Vec4Model;
