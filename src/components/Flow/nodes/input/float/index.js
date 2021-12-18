import React, { useCallback } from 'react';

import BaseNode from '../../core/node';
import OutputLabelComponent from '../../labels/output';
import { registerComponent } from '../../../../../store/tree/core/tree';
import { NodeTypes } from '../../../../../store/tree/const';
import { observer } from 'mobx-react';
import SliderInput from '../../../../SliderInput';
// import classNames from 'classnames';

const FloatInput = observer(({target}) => {
  const updateX = useCallback((e) => {
    target.set(e);
  }, [target]);

  return (
    <div className='node-input node-input_group'>
      <SliderInput
        placeholder='x'
        value={target.value}
        onChange={updateX}
      />
    </div>
  )
});


const FloatNode = ({ data }) => {

  return (
    <BaseNode title='Float' type='input'>
      <OutputLabelComponent id='value' label='Value' type={NodeTypes.Float} />
      <div className='node-input__label'>Value:</div>
      <FloatInput target={data.value} />
    </BaseNode>
  )
};

registerComponent(NodeTypes.Float, FloatNode);

export default FloatNode;