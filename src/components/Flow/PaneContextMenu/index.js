import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Vector2 } from 'three';
import { useZoomPanHelper } from 'react-flow-renderer';

import { ClickAwayListener } from '@mui/material';
import Paper from '@mui/material/Paper';

import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';

import { GroupedGraphNodes } from '../../../graph/const';


const PaneContextGroup = ({group, name, filter, onCreate}) => {
  const [opened, setOpened] = useState(false);

  const onChange = useCallback((e, expanded) => {
    // if (!filter) {
      setOpened(expanded);
    // }
  }, [filter]);

  useEffect(() => {
    setOpened(Boolean(filter));
  }, [filter]);

  return (
    <Accordion
      disableGutters={true}
      square={true}
      expanded={opened}
      onChange={onChange}
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
            group.map(({name, type}) => {
              if (filter && (name.indexOf(filter) === -1)) {
                return null;
              }

              return (
                <ListItem
                  disablePadding
                  key={type}
                  onClick={() => onCreate(type)}
                >
                  <ListItemButton>
                    <ListItemText primary={name} />
                  </ListItemButton>
                </ListItem>
              )
            })
          }
        </List>
      </AccordionDetails>
    </Accordion>
  )
}

const PaneContextMenu = ({onClose, event = null, tree}) => {
  const ref = useRef(null);
  const positionRef = useRef({x: -999999, y: -999999});

  const [itemFilter, setItemFilter] = useState('');

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

  const onFilterChange = useCallback((e) => {
    setItemFilter(e.target.value);
  }, []);

  if (!event) {
    return null;
  }

  return (
    <Paper
      // elevation={3}
      variant="outlined"
      square
      className='context-menu'
      style={{
        // top, left,
        maxWidth: 240,
        width: 240,
        top: positionRef.current.y,
        left: positionRef.current.x
      }}
      ref={ref}
    >
      <div className='node-base__header'>
        <div className='node-base__header__title'>Add node</div>
      </div>
      <div className='search-field'>
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          className='search-node'
          placeholder="Search Node"
          inputProps={{ 'aria-label': 'search node' }}
          onChange={onFilterChange}
          value={itemFilter}
        />
        <IconButton aria-label="search">
          <SearchIcon />
        </IconButton>
      </div>
      <div className='context-elements'>
        {Object.keys(GroupedGraphNodes).map(name => {
          if (itemFilter) {
            let groupHasFiltered = GroupedGraphNodes[name].filter(({name}) => (name.indexOf(itemFilter) !== -1)).length;
            if (!groupHasFiltered) {
              return null;
            }
          }
          
          return (
            <PaneContextGroup key={name} group={GroupedGraphNodes[name]} name={name} filter={itemFilter} onCreate={onCreate} />
          )
        })}
      </div>
    </Paper>
  )
}

export default PaneContextMenu;