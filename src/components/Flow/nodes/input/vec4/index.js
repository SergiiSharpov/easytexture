import React, { useCallback } from 'react';

import BaseNode from '../../core/node';
import OutputLabelComponent from '../../labels/output';
import { registerComponent } from '../../../../../store/tree/core/tree';
import { NodeTypes } from '../../../../../store/tree/const';
import { observer } from 'mobx-react';
import SliderInput from '../../../../SliderInput';
// import classNames from 'classnames';

const Vector4Input = observer(({target}) => {
  const updateX = useCallback((e) => {
    target.setX(e);
  }, [target]);
  
  const updateY = useCallback((e) => {
    target.setY(e);
  }, [target]);

  const updateZ = useCallback((e) => {
    target.setZ(e);
  }, [target]);

  const updateW = useCallback((e) => {
    target.setW(e);
  }, [target]);

  return (
    <div className='node-input node-input_group'>
      <SliderInput
        placeholder='x'
        value={target.x}
        onChange={updateX}
      />
      <SliderInput
        placeholder='y'
        value={target.y}
        onChange={updateY}
      />
      <SliderInput
        placeholder='z'
        value={target.z}
        onChange={updateZ}
      />
      <SliderInput
        placeholder='w'
        value={target.w}
        onChange={updateW}
      />
    </div>
  )
});


const Vec4Node = ({ data }) => {

  return (
    <BaseNode title='Vec4' type='input'>
      <OutputLabelComponent id='value' label='Vector' type={NodeTypes.Vector4} />
      <div className='node-input__label'>Vector:</div>
      <Vector4Input target={data.value} />
    </BaseNode>
  )
};

registerComponent(NodeTypes.Vector4, Vec4Node);

export default Vec4Node;