import React from 'react';
import Node from '../../../../components/Flow/nodes/core/node';
import InputLabelComponent from '../../../../components/Flow/nodes/labels/input';
import { GraphNodes } from '../../../const';
type IProps = {
  data: {
    value: number;
  }
}
const OutView = ( { data } ) => {

  return (
    <Node title='Color output' type='output'>
      <InputLabelComponent id='value' label='Vector' type={ GraphNodes.Vector4.type } />
    </Node>
  );
};

export default OutView;
