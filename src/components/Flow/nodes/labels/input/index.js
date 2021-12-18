import React from 'react';
import { Handle } from 'react-flow-renderer';

const InputLabelComponent = ({id, label, type}) => {
  return (
    <div className='node-base__content'>
      <Handle type="target" position="left" id={id} className={type} />
      <div className='node-base__content__title' style={{textAlign: 'left'}}>{label}</div>
    </div>
  )
}

export default InputLabelComponent;