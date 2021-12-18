import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import ReactFlow, { Controls, useZoomPanHelper } from 'react-flow-renderer';
import { observer } from 'mobx-react';
import { Vector2 } from 'three';

import Paper from '@mui/material/Paper';

import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';


// Just to make nodes registred
require('./nodes');

// you need these styles for React Flow to work properly
import 'react-flow-renderer/dist/style.css';

// additionally you can load the default theme
// import 'react-flow-renderer/dist/theme-default.css';
 

import bgImage from './../../assets/images/prototype/dark/texture_08.png'
import compile from '../../shadergen';
import simpleShaderMaterial from '../../store/simpleShaderMaterial';
import { NodeGroups, TypedComponents } from '../../store/tree/core/tree';
import { ClickAwayListener } from '@mui/material';


// compile(elements, simpleShaderMaterial);

const PaneContextGroup = ({group, name, onCreate}) => {
  // const onCreateCallback = useCallback(() => {

  // }, []);

  return (
    <Accordion
      disableGutters={true}
      square={true}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <div>{name}</div>
      </AccordionSummary>
      <AccordionDetails>
        <List>
          {
            group.map(({name, type}) => (
              <ListItem
                disablePadding
                key={type}
                onClick={() => onCreate(type)}
              >
                <ListItemButton>
                  <ListItemText primary={name} />
                </ListItemButton>
              </ListItem>
            ))
          }
        </List>
      </AccordionDetails>
    </Accordion>
  )
}

const PaneContextMenu = ({onClose, event = null, tree}) => {
  const ref = useRef(null);
  const positionRef = useRef({x: -999999, y: -999999});

  const {project} = useZoomPanHelper();

  useEffect(() => {
    if (event) {
      let top = event.nativeEvent.offsetY;
      let left = event.nativeEvent.offsetX;

      positionRef.current.x = left;
      positionRef.current.y = top;

      top = Math.min(top, event.target.offsetHeight - ref.current.offsetHeight);
      left = Math.min(left, event.target.offsetWidth - ref.current.offsetWidth);

      ref.current.style.top = `${top}px`;
      ref.current.style.left = `${left}px`;
    }
  }, [event]);

  const onCreate = useCallback((type) => {
    // console.log(project(positionRef.current));
    // console.log(type, event.target);
    let pos = project(positionRef.current);
    tree.createNode(type, new Vector2(pos.x, pos.y));

    onClose();
  }, [event, project, tree, onClose]);

  if (!event) {
    return null;
  }

  return (
    <ClickAwayListener onClickAway={onClose}>
      <Paper
        // elevation={3}
        variant="outlined"
        square
        className='context-menu'
        style={{
          // top, left,
          maxWidth: 240,
          width: 240
        }}
        ref={ref}
      >
        {/* <Typography sx={{ p: 2 }}>The content of the Popover.</Typography> */}
        {Object.keys(NodeGroups).map(name => <PaneContextGroup key={name} group={NodeGroups[name]} name={name} onCreate={onCreate} />)}
      </Paper>
    </ClickAwayListener>
  )
}

const Flow = observer(({tree}) => {
  const [rfInstance, setRfInstance] = useState(null);

  const [paneContextEvent, setPaneContextEvent] = useState(null);

  const onPaneContextClose = useCallback(() => {
    setPaneContextEvent(null);
  }, []);
  // const onConnect = (params) => setElements((els) => addEdge(params, els));

  const onLoad = useCallback((instance) => {
    instance.fitView();
    setRfInstance(instance);
  }, []);

  const onZoom = useCallback((e) => {
    // const { zoom, ...props } = rfInstance.toObject();
    // console.log('zoomIn', e, zoom, props);
  }, [rfInstance])

  const onPaneContextMenu = useCallback((e) => {
    // setListPos({top: e.nativeEvent.offsetY, left: e.nativeEvent.offsetX});
    setPaneContextEvent(e);
  }, []);

  return (
    <div
      className='flow-container'
      style={{backgroundImage: `url(${bgImage})`}}
    >
      <ReactFlow
        elements={tree.flat}
        nodeTypes={TypedComponents}
        onLoad={onLoad}
        onConnect={tree.onConnect}

        onEdgeUpdate={console.log}
        onEdgeUpdateEnd={console.log}
        onPaneContextMenu={onPaneContextMenu}
      >
        <Controls
          onZoomIn={onZoom}
          onZoomOut={onZoom}
        />
        <PaneContextMenu onClose={onPaneContextClose} event={paneContextEvent} tree={tree} />
      </ReactFlow>
      
    </div>
  );
});

export default Flow;