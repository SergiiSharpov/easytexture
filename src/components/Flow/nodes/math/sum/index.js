import React, { useCallback, useState } from 'react';
import TextField from '@mui/material/TextField';

import BaseNode from '../../core/node';
import OutputLabelComponent from '../../labels/output';
import InputLabelComponent from '../../labels/input';
import { registerComponent } from '../../../../../store/tree/core/tree';
import { NodeTypes } from '../../../../../store/tree/const';
import { observer } from 'mobx-react';


const SumNode = () => {

  return (
    <BaseNode title='Sum' >
      <OutputLabelComponent id="value" label='Out' />
      <InputLabelComponent id="a" label='In 1' />
      <InputLabelComponent id="b" label='In 2' />
    </BaseNode>
  )
};

registerComponent(NodeTypes.Sum, SumNode);
console.log(NodeTypes);

export default SumNode;