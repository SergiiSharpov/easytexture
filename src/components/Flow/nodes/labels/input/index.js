import React from 'react';
import { Handle } from 'react-flow-renderer';

const InputLabelComponent = ({id, label}) => {
  return (
    <div className='node-base__content'>
      <Handle type="target" position="left" id={id} />
      <div className='node-base__content__title' style={{textAlign: 'left'}}>{label}</div>
    </div>
  )
}

export default InputLabelComponent;