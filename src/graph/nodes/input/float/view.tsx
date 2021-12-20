import React, { useCallback } from 'react';
import { observer } from 'mobx-react';

import Node from '../../../../components/Flow/nodes/core/node';
import SliderInput from '../../../../components/SliderInput';
import OutputLabelComponent from '../../../../components/Flow/nodes/labels/output';
import { GraphNodes } from '../../../const';

const FloatInput = observer(({target}) => {
  const update = useCallback((e) => {
    target.set(e);
  }, [target]);

  return (
    <div className='node-input node-input_group'>
      <SliderInput
        placeholder='x'
        value={target.value}
        onChange={update}
      />
    </div>
  )
});


const FloatView = ({ data }) => {

  return (
    <Node title='Float' type='input'>
      <OutputLabelComponent id='value' label='Float' type={GraphNodes.Float.type} />
      <div className='node-input__label'>Vector:</div>
      <FloatInput target={data.value} />
    </Node>
  )
};

export default FloatView;