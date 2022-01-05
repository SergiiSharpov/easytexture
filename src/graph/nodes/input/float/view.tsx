import React from 'react';
import Node from '../../../../components/Flow/nodes/core/node';
import OutputLabelComponent from '../../../../components/Flow/nodes/labels/output';
import { GraphNodes } from '../../../const';
import FloatInput from './FloatInput';
type IProps = {
  data : {
    value: {
      value: number;
      set: ( v: number )=> void;
    }
  };
}
const FloatView = ( { data } : IProps ) => {

  return (
    <Node title='Float' type='input'>
      <OutputLabelComponent id='value' label='Float' type={ GraphNodes.Float.type } />
      <div className='node-input__label'>Vector:</div>
      <FloatInput target={ data.value } />
    </Node>
  );
};

export default FloatView;
