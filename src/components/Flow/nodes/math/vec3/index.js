import React, { useCallback, useState } from 'react';
import TextField from '@mui/material/TextField';

import BaseNode from '../../core/node';
import OutputLabelComponent from '../../labels/output';
// import classNames from 'classnames';

let count = 0;
const Vec3Node = ({ data }) => {
  const [_, update] = useState(false);

  const updateX = useCallback((e) => {
    data.value.x = +e.target.value;
    update(count++);
  }, [data, update]);
  
  const updateY = useCallback((e) => {
    data.value.y = +e.target.value;
    update(count++);
  }, [data, update]);

  const updateZ = useCallback((e) => {
    data.value.z = +e.target.value;
    update(count++);
  }, [data, update]);


  return (
    <BaseNode title='Vec3' type='input'>
      <OutputLabelComponent id='a' label='Vector' />
      <div className='node-input__label'>Vector:</div>
      <div className='node-input node-input_group'>
        <TextField
          hiddenLabel
          id="filled-hidden-label-small"
          type='number'
          placeholder='x'
          value={data.value.x}
          onChange={updateX}
          variant="filled"
          size="small"
        />
        <TextField
          hiddenLabel
          id="filled-hidden-label-small"
          type='number'
          placeholder='y'
          value={data.value.y}
          onChange={updateY}
          variant="filled"
          size="small"
        />
        <TextField
          hiddenLabel
          id="filled-hidden-label-small"
          type='number'
          placeholder='z'
          value={data.value.z}
          onChange={updateZ}
          variant="filled"
          size="small"
        />
      </div>
    </BaseNode>
  )
}

export default Vec3Node;