// import { graphNodeType } from 'src/graph';
import BaseNode from '../../../baseNode';

class OutModel extends BaseNode {
  // type: graphNodeType= 'out';

  value = null;

  // constructor( ...props ) {
  //   super( ...props );
  // }

  // static type = GraphNodes.Out.type;

  isDepsPresent( /* nodesInPlace*/ ) {
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
