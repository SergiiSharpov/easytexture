import React, { useCallback } from 'react';
import { observer } from 'mobx-react';
import SliderInput from '../../../../components/SliderInput';

const FloatInput = observer( ( { target } ) => {
  const update = useCallback( ( e ) => {
    target.set( e );
  }, [target] );

  return (
    <div className='node-input node-input_group'>
      <SliderInput
        placeholder='x'
        value={ target.value }
        onChange={ update }
      />
    </div>
  );
} );

export default FloatInput;
