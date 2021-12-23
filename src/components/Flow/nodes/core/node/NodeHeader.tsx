import React from 'react';
import classNames from 'classnames';
type IProps = {
  children?: any; /* @TODO replace to correct type here */
  closed: boolean;
  onClose: React.Dispatch<React.SetStateAction<boolean>>;
}
const NodeHeader = ( { children, closed, onClose }: IProps ) => {
  const className = classNames( {
    'node-base__header__btn': true,
    'node-node-base__header__btn__closed': closed
  } );

  return (
    <div className='node-base__header'>
      <div className='node-base__header__title'>{children}</div>
      <div
        className={ className }
        onMouseDown={ ( e ) => e.stopPropagation() }
      >
        <div onClick={ () => onClose( !closed ) }><span/></div>
      </div>
    </div>
  );
};

export default NodeHeader;
