import { makeAutoObservable } from 'mobx';
import { GraphNodes } from '../../../const';
import BaseNode from '../../../baseNode';

class FloatModel extends BaseNode {
  value = makeAutoObservable( {
    value: 0.0,
    set( value: number ) {
      this.value = value;
    }
  } );

  // constructor( ...props ) {
  //   super( ...props );
  // }
  getFragmentHeader( uniforms ) {
    uniforms[ this.id ] = this.value;

    return `uniform ${ ( this.constructor as typeof FloatModel ).type } ${ this.id };\n`;
  }

  static type = GraphNodes.Float.type;
}

export default FloatModel;
