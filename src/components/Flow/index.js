import React from 'react';
import ReactFlow, { Controls, Handle } from 'react-flow-renderer';

// you need these styles for React Flow to work properly
import 'react-flow-renderer/dist/style.css';

// additionally you can load the default theme
// import 'react-flow-renderer/dist/theme-default.css';
 

import bgImage from './../../assets/images/prototype/dark/texture_08.png'
//console.log(bgImage)
//document.body.style.backgroundImage = `url(${bgImage})`;

const elements = [
  { id: '1', type: 'special', data: { label: 'Node 1' }, position: { x: 100, y: 5 }, targetPosition: 'left', sourcePosition: 'right' },
  // you can also pass a React Node as a label
  { id: '2', data: { label: "Node 2" }, position: { x: 350, y: 100 }, targetPosition: 'left', sourcePosition: 'right' },
  // { id: 'e1-2', source: '1', sourceHandle: 'b', target: '2', animated: true },
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
    <div className='node-base node-base__output'>
      <HeaderNodeComponent>Title</HeaderNodeComponent>
      <OutputLabelComponent id="a" label={data.label} />
      {children}
    </div>
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
  special: InputNode,
};


const Flow = () => {

  return (
    <div
      className='flow-container'
      style={{backgroundImage: `url(${bgImage})`}}
    >
      <ReactFlow elements={elements} nodeTypes={nodeTypes}>
        <Controls />
      </ReactFlow>
    </div>
  );
};

export default Flow;