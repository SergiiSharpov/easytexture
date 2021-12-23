import React, { useCallback, useEffect, useState } from 'react';
import Input from './Input';
// eslint-disable-next-line no-empty-function, @typescript-eslint/no-empty-function
const placeholderFn = () => {};

type IProps = {
  value: number;
  min?: number;
  max?: number;
  step?: number;
  canSlide?: boolean;
  onChange: ( n: number )=>void;
  placeholder?: 'x' | 'y' | 'z' | 'w';
}

const SliderInput = (
  { value, min = 0, max = 0, step = 0.1, canSlide = true, onChange = placeholderFn, ...props }: IProps
) => {
  const [targetValue, setTargetValue] = useState( value );

  useEffect( () => {
    setTargetValue( value );
  }, [value] );

  const onInputChange = useCallback( ( e ) => {
    let valueAsString = e.target.value;
    if ( valueAsString === '' || valueAsString === '-' ) {
      setTargetValue( valueAsString );
    } else if ( valueAsString.indexOf( '.' ) === ( valueAsString.length - 1 ) ) {
      setTargetValue( valueAsString );
    } else if ( e.target.validity.valid ) {
      onChange( Number( valueAsString ) );
      setTargetValue( Number( valueAsString ) );
    }
  }, [onChange] );

  return (
    <div className='input-slider'>
      <Input { ...props } value={ targetValue } onChange={ onInputChange } onNumberChange={ onChange } />
    </div>
  );
};

export default SliderInput;
