import React, { useCallback, useRef, useState } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import classNames from 'classnames';
import { useDrag } from '@use-gesture/react';
type IProps = {
  value: any; /* @TODO replace to correct type here */
  onChange: ( e: any /* @TODO replace to correct type here */ ) => void;
  onNumberChange: ( n: number ) => void;
}
const Input = ( { value, onChange, onNumberChange, ...props }: IProps ) => {
  const [focused, setFocused] = useState( false );
  const ref = useRef( null );

  const onBlur = useCallback( ( e ) => {
    let valueAsString = e.target.value;
    if ( valueAsString === '' || valueAsString === '-' || valueAsString === '.' || valueAsString === '-.' ) {
      e.target.value = '0';
      onChange( e );
    }

    setFocused( false );
  }, [] );

  const onDownGrip = useCallback( ( e ) => {
    let str = ref.current.value;
    if ( [
      '-',
      '-.',
      '.'
    ].includes( str ) === false ) {
      let res = ( Number( ref.current.value ) ) - ( e.altKey ? 0.1 : 1.0 );
      onNumberChange( Number( res.toFixed( 3 ) ) );
    } else {
      str = '0';
    }
  }, [onNumberChange] );

  const onUpGrip = useCallback( ( e ) => {
    let str = ref.current.value;
    if ( [
      '-',
      '-.',
      '.'
    ].includes( str ) === false ) {
      let res = ( Number( ref.current.value ) ) + ( e.altKey ? 0.1 : 1.0 );
      onNumberChange( Number( res.toFixed( 3 ) ) );
    } else {
      str = '0';

    }
  }, [onNumberChange] );

  const bind = useDrag( ( { altKey, delta: [dx, dy] } ) => {
    let str = value;
    if ( !( str !== '-' && str !== '-.' && str !== '.' ) ) {
      str = '0';
    }

    let res = ( Number( str ) ) - ( dy * ( altKey ? 0.1 : 1.0 ) );

    onNumberChange( Number( res.toFixed( 3 ) ) );
  } );

  const className = classNames( {
    'input-slider__input': true,
    focused
  } );

  return (
    <div
      className={ className }
      onMouseDown={ ( e ) => e.stopPropagation() }
    >
      <div className='input-slider__input__content'>
        <input
          ref={ ref }
          type='text'
          pattern='-?[0-9]*\.?[0-9]*'
          value={ value }
          onChange={ onChange }
          { ...props }
          onFocus={ () => setFocused( true ) }
          onBlur={ onBlur }
        />
      </div>
      <div className='input-slider__input__handles' { ...bind() }>
        <ExpandMoreIcon onClick={ onUpGrip } />
        <ExpandMoreIcon onClick={ onDownGrip } />
      </div>
    </div>
  );
};

export default Input;
