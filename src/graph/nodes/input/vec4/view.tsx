import React from 'react';
import Node from '../../../../components/Flow/nodes/core/node';
import OutputLabelComponent from '../../../../components/Flow/nodes/labels/output';
import { GraphNodes } from '../../../const';
import Vector4Input from './Vector4Input';
type IProps = {
  data: {
    value : number;
  }
}

const Vec4View = ( { data }: IProps ) => {

  return (
    <Node title='Vec4' type='input'>
      <OutputLabelComponent id='value' label='Vector' type={ GraphNodes.Vector4.type } />
      <div className='node-input__label'>Vector:</div>
      <Vector4Input target={ data.value } />
    </Node>
  );
};

export default Vec4View;
