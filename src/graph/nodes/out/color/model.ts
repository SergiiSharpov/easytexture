import BaseNode from 'graph/baseNode';

class OutModel extends BaseNode {
  value = null;

  isDepsPresent( /* nodesInPlace*/ ) {
    return true;
  }

  getFragmentBody() {
    const inputs = this.tree.getNodeConnections( this.id );

    return `gl_FragColor = ${ inputs.value.source };`;
  }

  isValid() {
    const inputs = this.tree.getNodeConnections( this.id );

    return Boolean( inputs.value );
  }
}

export default OutModel;
