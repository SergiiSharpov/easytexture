import React from 'react';
import Node from '../../../../components/Flow/nodes/core/node';
import InputLabelComponent from '../../../../components/Flow/nodes/labels/input';
// type IProps = {};
const OutView = ( /* { data } : IProps*/ ) => {

  return (
    <Node title='Color output' type='output'>
      <InputLabelComponent id='value' label='Vector' type={ 'vec4' } />
    </Node>
  );
};

export default OutView;
