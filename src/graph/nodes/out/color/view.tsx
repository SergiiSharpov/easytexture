import React from 'react';
import { Nodes } from 'src/graph';
import Node from '../../../../components/Flow/nodes/core/node';
import InputLabelComponent from '../../../../components/Flow/nodes/labels/input';
// type IProps = {};
const OutView = ( /* { data } : IProps*/ ) => {

  return (
    <Node title='Color output' type='output'>
      <InputLabelComponent id='value' label='Vector' type={ Nodes.vec4.type } />
    </Node>
  );
};

export default OutView;
