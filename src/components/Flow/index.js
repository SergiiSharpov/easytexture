import React, { useCallback, useState } from 'react';
import ReactFlow, { Controls, Handle } from 'react-flow-renderer';
import { Vector3 } from 'three';

// you need these styles for React Flow to work properly
import 'react-flow-renderer/dist/style.css';

// additionally you can load the default theme
// import 'react-flow-renderer/dist/theme-default.css';
 

import bgImage from './../../assets/images/prototype/dark/texture_08.png'
import BaseNode from './nodes/core/node';
import Vec3Node from './nodes/math/vec3';
import compile from '../../shadergen';
import simpleShaderMaterial from '../../store/simpleShaderMaterial';
//console.log(bgImage)
//document.body.style.backgroundImage = `url(${bgImage})`;

const elements = [
  { id: '1', type: 'vec3', data: { label: 'vector01', value: new Vector3() }, position: { x: 100, y: 0 }, targetPosition: 'left', sourcePosition: 'right' },
  { id: '2', type: 'vec3', data: { label: 'vector02', value: new Vector3(0, 0.5, 0.25) }, position: { x: 100, y: 300 }, targetPosition: 'left', sourcePosition: 'right' },
  // you can also pass a React Node as a label
  { id: '3', type: 'sum', data: { label: "sum01" }, position: { x: 450, y: 200 }, targetPosition: 'left', sourcePosition: 'right' },

  { id: '4', type: 'out', data: { label: 'Out' }, position: { x: 750, y: 200 }, targetPosition: 'left', sourcePosition: 'right' },
  
  // { id: 'e1-2', source: '1', sourceHandle: 'a', target: '2', targetHandle: 'a', animated: true },
  { id: 'e1-3', source: '1', sourceHandle: 'a', target: '3', targetHandle: 'a', animated: false },
  { id: 'e2-3', source: '2', sourceHandle: 'a', target: '3', targetHandle: 'b', animated: false },
  { id: 'e3-4', source: '3', sourceHandle: 'a', target: '4', targetHandle: 'a', animated: false },
];

const InputLabelComponent = ({id, label}) => {
  return (
    <div className='node-base__content'>
      <Handle type="target" position="left" id={id} />
      <div className='node-base__content__title' style={{textAlign: 'left'}}>{label}</div>
    </div>
  )
}

const OutputLabelComponent = ({id, label}) => {
  return (
    <div className='node-base__content'>
      <Handle type="source" position="right" id={id} />
      <div className='node-base__content__title' style={{textAlign: 'right'}}>{label}</div>
    </div>
  )
}

const HeaderNodeComponent = ({children}) => {
  return (
    <div className='node-base__header'>
      {children}
    </div>
  )
}

const InputNode = ({children, data}) => {
  return (
    <div className='node-base node-base__input'>
      <HeaderNodeComponent>Title</HeaderNodeComponent>
      <OutputLabelComponent id="a" label={data.label} />
      {children}
    </div>
  )
}

const OutputNode = ({children, data}) => {
  return (
    <BaseNode title='Result color' type='output' >
      <InputLabelComponent id="a" label={data.label} />
      {children}
    </BaseNode>
  )
}

const BaseNodeNext = ({children, data}) => {
  return (
    <BaseNode title='Sum' >
      <OutputLabelComponent id="a" label='Out' />
      <InputLabelComponent id="a" label='In 1' />
      <InputLabelComponent id="b" label='In 2' />
      {children}
    </BaseNode>
  )
}


const CustomNodeComponent = ({ data }) => {
  return (
    <div className='node-base'>
      <OutputLabelComponent id="a" label={data.label} />
      <InputLabelComponent id="a" label={data.label} />
    </div>
  );
};

const nodeTypes = {
  vec3: Vec3Node,
  out: OutputNode,
  sum: BaseNodeNext
};

compile(elements, simpleShaderMaterial);

const Flow = () => {
  const [rfInstance, setRfInstance] = useState(null);
  // const onConnect = (params) => setElements((els) => addEdge(params, els));

  const onLoad = useCallback((instance) => {
    instance.fitView();
    setRfInstance(instance);
  }, []);

  const onZoom = useCallback((e) => {
    // const { zoom, ...props } = rfInstance.toObject();
    // console.log('zoomIn', e, zoom, props);
  }, [rfInstance])

  return (
    <div
      className='flow-container'
      style={{backgroundImage: `url(${bgImage})`}}
    >
      <ReactFlow elements={elements} nodeTypes={nodeTypes} onLoad={onLoad}>
        <Controls
          onZoomIn={onZoom}
          onZoomOut={onZoom}
        />
      </ReactFlow>
    </div>
  );
};

export default Flow;