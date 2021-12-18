import React, { useCallback, useState } from 'react';

import BaseNode from '../core/node';
import InputLabelComponent from '../labels/input';

import { NodeTypes } from '../../../../store/tree/const';
import { registerComponent } from '../../../../store/tree/core/tree';
// import classNames from 'classnames';



const OutputNode = ({ data }) => {

  return (
    <BaseNode title='Output' type='output'>
      <InputLabelComponent id="out" label='Out' type={NodeTypes.Vector4} />
    </BaseNode>
  )
};

registerComponent(NodeTypes.Out, OutputNode);

export default OutputNode;