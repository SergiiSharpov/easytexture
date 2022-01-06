import React from 'react';
import Node from '../../../../components/Flow/nodes/core/node';

import OutputLabelComponent from '../../../../components/Flow/nodes/labels/output';
import { GraphNodes } from '../../../const';
import Vector2Input from './Vec2Input';

const Vec2View = ( { data } ) => {

  return (
    <Node title='Vec2' type='input'>
      <OutputLabelComponent id='value' label='Vector' type={ GraphNodes.Vector3.type } />
      <div className='node-input__label'>Vector:</div>
      <Vector2Input target={ data.value } />
    </Node>
  );
};

export default Vec2View;
