import React, { useState } from 'react';
import classNames from 'classnames';

const NodeHeader = ({children, closed, onClose}) => {
  const className = classNames({
    'node-base__header__btn': true,
    'node-node-base__header__btn__closed': closed
  });

  return (
    <div className='node-base__header'>
      <div className='node-base__header__title'>{children}</div>
      <div
        className={className}
        onMouseDown={e => e.stopPropagation()}
      >
        <div onClick={() => onClose(!closed)}><span/></div>
      </div>
    </div>
  )
}

const Node = ({children, title, type = 'base'}) => {
  const [closed, setClosed] = useState(false);

  const className = classNames({
    'node-base': true,
    'node-base__output': (type == 'output'),
    'node-base__input': (type == 'input'),
    'node-base__closed': closed
  });

  return (
    <div className={className}>
      <NodeHeader closed={closed} onClose={setClosed}>{title}</NodeHeader>
      <div className='node-base__body'>{children}</div>
    </div>
  )
}

export default Node;