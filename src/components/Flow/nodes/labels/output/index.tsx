import React from 'react';
import { Handle } from 'react-flow-renderer';
import { graphNodeType } from 'graph';
type IProps = {
  id: string;
  label: string | JSX.Element;
  type: graphNodeType;
}
const OutputLabelComponent = ( { id, label, type }: IProps ) => {
  return (
    <div className='node-base__content'>
      <Handle type='source' position='right' id={ id } className={ type } />
      <div className='node-base__content__title' style={ { textAlign: 'right' } }>{label}</div>
    </div>
  );
};

export default OutputLabelComponent;
