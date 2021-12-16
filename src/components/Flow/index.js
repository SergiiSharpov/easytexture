import React from 'react';
import ReactFlow, { Controls } from 'react-flow-renderer';

// you need these styles for React Flow to work properly
import 'react-flow-renderer/dist/style.css';

// additionally you can load the default theme
// import 'react-flow-renderer/dist/theme-default.css';
 

import bgImage from './../../assets/images/prototype/dark/texture_08.png'
//console.log(bgImage)
//document.body.style.backgroundImage = `url(${bgImage})`;

const elements = [
  { id: '1', type: 'input', data: { label: 'Node 1' }, position: { x: 250, y: 5 } },
  // you can also pass a React Node as a label
  { id: '2', data: { label: <div>Node 2</div> }, position: { x: 100, y: 100 } },
  { id: 'e1-2', source: '1', target: '2', animated: true },
];

const Flow = () => {

  return (
    <div
      className='flow-container'
      style={{backgroundImage: `url(${bgImage})`}}
    >
      <ReactFlow elements={elements}>
        <Controls />
      </ReactFlow>
    </div>
  );
};

export default Flow;