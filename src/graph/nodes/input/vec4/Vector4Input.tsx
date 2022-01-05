import React, { useCallback } from 'react';
import { observer } from 'mobx-react';
import SliderInput from '../../../../components/SliderInput';
import { Vector4 } from 'three';
type IProps = {
  target: Vector4
}
const Vector4Input = observer( ( { target }: IProps ) => {
  const updateX = useCallback( ( e ) => {
    target.setX( e );
  }, [target] );

  const updateY = useCallback( ( e ) => {
    target.setY( e );
  }, [target] );

  const updateZ = useCallback( ( e ) => {
    target.setZ( e );
  }, [target] );

  const updateW = useCallback( ( e ) => {
    target.setW( e );
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
      <SliderInput
        placeholder='z'
        value={ target.z }
        onChange={ updateZ }
      />
      <SliderInput
        placeholder='w'
        value={ target.w }
        onChange={ updateW }
      />
    </div>
  );
} );

export default Vector4Input;
