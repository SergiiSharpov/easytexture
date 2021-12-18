import React, { useCallback } from 'react';

import BaseNode from '../../core/node';
import OutputLabelComponent from '../../labels/output';
import { registerComponent } from '../../../../../store/tree/core/tree';
import { NodeTypes } from '../../../../../store/tree/const';
import { observer } from 'mobx-react';
import SliderInput from '../../../../SliderInput';
// import classNames from 'classnames';

const Vector3Input = observer(({target}) => {
  const updateX = useCallback((e) => {
    target.setX(e);
  }, [target]);
  
  const updateY = useCallback((e) => {
    target.setY(e);
  }, [target]);

  const updateZ = useCallback((e) => {
    target.setZ(e);
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
    </div>
  )
});


const Vec3Node = ({ data }) => {

  return (
    <BaseNode title='Vec3' type='input'>
      <OutputLabelComponent id='value' label='Vector' type={NodeTypes.Vector3} />
      <div className='node-input__label'>Vector:</div>
      <Vector3Input target={data.value} />
    </BaseNode>
  )
};

registerComponent(NodeTypes.Vector3, Vec3Node);

export default Vec3Node;