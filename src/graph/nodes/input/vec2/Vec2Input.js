import React, { useCallback } from 'react';
import { observer } from 'mobx-react';
import SliderInput from '../../../../components/SliderInput';

const Vector2Input = observer( ( { target } ) => {
  const updateX = useCallback( ( e ) => {
    target.setX( e );
  }, [target] );

  const updateY = useCallback( ( e ) => {
    target.setY( e );
  }, [target] );


  return (
    <div className='node-input node-input_group'>
      <SliderInput
        placeholder='x'
        value={ target.x }
        onChange={ updateX }
      />
      <SliderInput
        placeholder='y'
        value={ target.y }
        onChange={ updateY }
      />
    </div>
  );
} );

export default Vector2Input;
