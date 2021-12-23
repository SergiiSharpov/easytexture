import React from 'react';
import { Handle } from 'react-flow-renderer';
import { graphNodeType } from 'src/graph/const';
type IProps = {
  id: string;
  label: string | JSX.Element;
  type: graphNodeType;
}
const InputLabelComponent = ( { id, label, type }:IProps ) => {
  return (
    <div className='node-base__content'>
      <Handle type='target' position='left' id={ id } className={ type } />
      <div className='node-base__content__title' style={ { textAlign: 'left' } }>{label}</div>
    </div>
  );
};

export default InputLabelComponent;
