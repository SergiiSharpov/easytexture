import { makeAutoObservable } from 'mobx';
import BaseNode from 'graph/baseNode';

class FloatModel extends BaseNode {
  value = makeAutoObservable( {
    value: 0.0,
    set( value: number ) {
      this.value = value;
    }
  } );

  getFragmentHeader( uniforms ) {
    uniforms[ this.id ] = this.value;

    return `uniform ${ this.type } ${ this.id };\n`;
  }
}

export default FloatModel;
