import React, { useCallback } from 'react';

import BaseNode from '../../core/node';
import OutputLabelComponent from '../../labels/output';
import { registerComponent } from '../../../../../store/tree/core/tree';
import { NodeTypes } from '../../../../../store/tree/const';
import { observer } from 'mobx-react';
import SliderInput from '../../../../SliderInput';
// import classNames from 'classnames';

const Vector2Input = observer(({target}) => {
  const updateX = useCallback((e) => {
    target.setX(e);
  }, [target]);
  
  const updateY = useCallback((e) => {
    target.setY(e);
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
    </div>
  )
});


const Vec2Node = ({ data }) => {

  return (
    <BaseNode title='Vec2' type='input'>
      <OutputLabelComponent id='value' label='Vector' type={NodeTypes.Vector2} />
      <div className='node-input__label'>Vector:</div>
      <Vector2Input target={data.value} />
    </BaseNode>
  )
};

registerComponent(NodeTypes.Vector2, Vec2Node);

export default Vec2Node;