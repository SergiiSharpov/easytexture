import React, { useCallback, useState } from 'react';
import ReactFlow, { Controls } from 'react-flow-renderer';
import { observer } from 'mobx-react';


// you need these styles for React Flow to work properly
import 'react-flow-renderer/dist/style.css';

// additionally you can load the default theme
// import 'react-flow-renderer/dist/theme-default.css';


import bgImage from './../../assets/images/prototype/dark/texture_08.png';
// import compile from '../../shadergen';
// import simpleShaderMaterial from '../../store/simpleShaderMaterial';

import { Views } from '../../graph';
import PaneContextMenu from './PaneContextMenu';
import Tree from 'src/store/tree';


// compile(elements, simpleShaderMaterial);
type IProps = {tree:Tree}

const Flow = observer( ( { tree }: IProps ) => {
  const [rfInstance, setRfInstance] = useState( null );

  const [paneContextEvent, setPaneContextEvent] = useState( null );

  const onPaneContextClose = useCallback( () => {
    setPaneContextEvent( null );
  }, [] );
  // const onConnect = (params) => setElements((els) => addEdge(params, els));

  const onLoad = useCallback( ( instance ) => {
    instance.fitView();
    setRfInstance( instance );
  }, [] );

  const onZoom = useCallback( ( ) => {
    // const { zoom, ...props } = rfInstance.toObject();
    // console.log('zoomIn', e, zoom, props);
  }, [rfInstance] );

  const onPaneContextMenu = useCallback( ( e ) => {
    // setListPos({top: e.nativeEvent.offsetY, left: e.nativeEvent.offsetX});
    setPaneContextEvent( e );
  }, [] );

  const onEdgeUpdate = useCallback( ( e, flowProps ) => {
    tree.disconnect( flowProps.id );
  }, [tree] );

  const onElementsRemove = useCallback( ( e ) => {
    for ( let item of e ) {
      tree.removeNode( item.type, item.id );
    }
  }, [] );

  return (
    <div
      className='flow-container'
      style={ { backgroundImage: `url(${ bgImage })` } }
    >
      <ReactFlow
        elements={ tree.flat }
        nodeTypes={ Views }
        onLoad={ onLoad }
        onConnect={ tree.onConnect }

        onEdgeUpdate={ console.log }
        onEdgeUpdateEnd={ onEdgeUpdate }
        onPaneContextMenu={ onPaneContextMenu }

        onPaneClick={ onPaneContextClose }
        onNodeDragStart={ onPaneContextClose }
        onMove={ onPaneContextClose }

        onElementsRemove={ onElementsRemove }
      >
        <Controls
          onZoomIn={ onZoom }
          onZoomOut={ onZoom }
        />
        <PaneContextMenu onClose={ onPaneContextClose } event={ paneContextEvent } tree={ tree } />
      </ReactFlow>

    </div>
  );
} );

export default Flow;
