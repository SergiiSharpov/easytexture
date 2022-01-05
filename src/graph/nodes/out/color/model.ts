import { GraphNodes } from '../../../const';
import BaseNode from '../../../baseNode';

class OutModel extends BaseNode {
  value = null;

  constructor( ...props ) {
    super( ...props );
  }

  static type = GraphNodes.Out.type;

  depsInPlace( /* nodesInPlace*/ ) {
    return true;
  }

  getFragmentBody() {
    const inputs = this.tree.getConnected( this.id );

    return `gl_FragColor = ${ inputs.value.source };`;
  }

  isValid() {
    const inputs = this.tree.getConnected( this.id );

    return Boolean( inputs.value );
  }
}

export default OutModel;
