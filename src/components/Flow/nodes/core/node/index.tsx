import React, { useState } from 'react';
import classNames from 'classnames';
import NodeHeader from './NodeHeader';
export type nodeType = 'input'| 'output' | 'base';
type IProps = {
  children?: any; /* @TODO replace to correct type here */
  title: string;
  type: nodeType
}

const Node = ( { children, title, type = 'base' } : IProps ) => {
  const [closed, setClosed] = useState( false );

  const className = classNames( {
    'node-base': true,
    'node-base__output': ( type === 'output' ),
    'node-base__input': ( type === 'input' ),
    'node-base__closed': closed
  } );

  return (
    <div className={ className }>
      <NodeHeader closed={ closed } onClose={ setClosed }>{title}</NodeHeader>
      <div className='node-base__body'>{children}</div>
    </div>
  );
};

export default Node;
