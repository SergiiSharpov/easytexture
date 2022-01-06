import React, { useEffect, useRef, useState } from 'react';
import { Transition } from 'react-transition-group';

const duration = 300;

const defaultStyle = {
  transition: `${ duration }ms ease-in-out`,
  opacity: 0
};

const transitionStyles = {
  entering: { opacity: 1, transform: 'translateY(0)' },
  entered: { opacity: 1, transform: 'translateY(0)' },
  exiting: { opacity: 0, transform: 'translateY(-64px)' },
  exited: { opacity: 0, transform: 'translateY(-64px)' }
};

const TransitionComponent = ( { children, show, styles, ...props } ) => {
  const revealStyles = show ? styles : { transitionDelay: 0 };

  return (
    <Transition
      // in={ show }
      timeout={ duration }
      unmountOnExit={ true }
      mountOnEnter={ true }
      { ...props }
    >
      {( state ) => (
        <div
          style={ {
            ...defaultStyle,
            ...transitionStyles[ state ],
            ...revealStyles
          } }
          className='transition'
        >
          {children}
        </div>
      )}
    </Transition>
  );
};

export default TransitionComponent;
