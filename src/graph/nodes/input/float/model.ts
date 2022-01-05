import { makeAutoObservable } from 'mobx';
import { graphNodeType } from '../../../';
import BaseNode from '../../../baseNode';

class FloatModel extends BaseNode {
  type: graphNodeType= 'float';

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

    return `uniform ${ this.type } ${ this.id };\n`;
  }

  // static type = GraphNodes.Float.type;
}

export default FloatModel;
