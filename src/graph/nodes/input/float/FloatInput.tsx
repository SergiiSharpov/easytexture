import React, { useCallback } from 'react';
import { observer } from 'mobx-react';
import SliderInput from 'components/SliderInput';
type IProps = {
  target: {
    value: number;
    set: ( t: number )=> void;
  };
}
const FloatInput = observer( ( { target } : IProps ) => {
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
