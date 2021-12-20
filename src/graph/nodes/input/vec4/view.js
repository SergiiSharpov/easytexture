import React, { useCallback } from 'react';
import { observer } from 'mobx-react';

import Node from '../../../../components/Flow/nodes/core/node';
import SliderInput from '../../../../components/SliderInput';
import OutputLabelComponent from '../../../../components/Flow/nodes/labels/output';
import { GraphNodes } from '../../../const';

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


const Vec4View = ({ data }) => {

  return (
    <Node title='Vec4' type='input'>
      <OutputLabelComponent id='value' label='Vector' type={GraphNodes.Vector4.type} />
      <div className='node-input__label'>Vector:</div>
      <Vector4Input target={data.value} />
    </Node>
  )
};

export default Vec4View;