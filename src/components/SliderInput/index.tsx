import React, { useCallback, useEffect, useRef, useState } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import classNames from 'classnames';
import { useDrag } from '@use-gesture/react';

const Slider = ({value, onChange}) => {

  return (
    <div className='input-slider__slider'>
      <div className='input-slider__handle'></div>
      <div>{value}</div>
    </div>
  )
}

const Input = ({value, onChange, onNumberChange, ...props}) => {
  const [focused, setFocused] = useState(false);
  const ref = useRef(null);

  const onBlur = useCallback((e) => {
    let valueAsString = e.target.value;
    if (valueAsString === '' || valueAsString === '-' || valueAsString === '.' || valueAsString === '-.') {
      e.target.value = '0';
      onChange(e);
    }
    setFocused(false);
  }, []);

  const onDownGrip = useCallback((e) => {
    let str = ref.current.value;
    if (!(str !== '-' && str !== '-.' && str !== '.')) {
      str = '0';
    } else {
      let res = (+ref.current.value) - (e.altKey ? 0.1 : 1.0);
      onNumberChange(+(res.toFixed(3)));
    }
  }, [onNumberChange]);

  const onUpGrip = useCallback((e) => {
    let str = ref.current.value;
    if (!(str !== '-' && str !== '-.' && str !== '.')) {
      str = '0';
    } else {
      let res = (+ref.current.value) + (e.altKey ? 0.1 : 1.0);
      onNumberChange(+(res.toFixed(3)));
    }
  }, [onNumberChange]);

  const bind = useDrag(({ altKey, delta: [dx, dy] }) => {
    let str = value;
    if (!(str !== '-' && str !== '-.' && str !== '.')) {
      str = '0';
    }
    
    let res = (+str) - (dy * (altKey ? 0.1 : 1.0));
    
    onNumberChange(+res.toFixed(3));
  })

  const className = classNames({
    'input-slider__input': true,
    'focused': focused
  });

  return (
    <div
      className={className}
      onMouseDown={e => e.stopPropagation()}
    >
      <div className='input-slider__input__content'>
        <input
          ref={ref}
          type='text'
          pattern="-?[0-9]*\.?[0-9]*"
          value={value}
          onChange={onChange}
          {...props}
          onFocus={() => setFocused(true)}
          onBlur={onBlur}
        />
      </div>
      <div className='input-slider__input__handles' {...bind()}>
        <ExpandMoreIcon onClick={onUpGrip} />
        <ExpandMoreIcon onClick={onDownGrip} />
      </div>
    </div>
  )
}

const placeholderFn = () => {};
const SliderInput = ({value, min = 0, max = 0, step = 0.1, canSlide = true, onChange = placeholderFn, ...props}) => {
  const [targetValue, setTargetValue] = useState(value);

  useEffect(() => {
    setTargetValue(value);
  }, [value]);

  const onInputChange = useCallback((e) => {
    let valueAsString = e.target.value;
    if (valueAsString === '' || valueAsString === '-') {
      setTargetValue(valueAsString);
    } else if (valueAsString.indexOf('.') === (valueAsString.length - 1)) {
      setTargetValue(valueAsString);
    } else if (e.target.validity.valid) {
      onChange(+valueAsString);
      setTargetValue(+valueAsString);
    }
  }, [onChange]);

  return (
    <div className='input-slider'>
      <Input {...props} value={targetValue} onChange={onInputChange} onNumberChange={onChange} />
    </div>
  )
}

export default SliderInput;