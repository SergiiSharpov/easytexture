import React, { useCallback, useEffect, useRef, useState } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { graphNode, graphNodeType } from '../../../graph/const';
type IProps = {
  group: graphNode[];
  name: string;
  filter: any; /* @TODO replace to correct type here */
  onCreate: ( type: graphNodeType ) => void;
}

const PaneContextGroup = ( { group, name, filter, onCreate }: IProps ) => {
  const [opened, setOpened] = useState( false );

  const onChange = useCallback( ( e, expanded ) => {
    // if (!filter) {
    setOpened( expanded );
    // }
  }, [filter] );

  useEffect( () => {
    setOpened( Boolean( filter ) );
  }, [filter] );

  return (
    <Accordion
      disableGutters={ true }
      square={ true }
      expanded={ opened }
      onChange={ onChange }
    >
      <AccordionSummary
        expandIcon={ <ExpandMoreIcon /> }
        aria-controls='panel1a-content'
        id='panel1a-header'
      >
        <div>{name}</div>
      </AccordionSummary>
      <AccordionDetails>
        <List>
          {
            group.map( ( { name, type } ) => {
              if ( filter && ( name.indexOf( filter ) === -1 ) ) {
                return null;
              }

              return (
                <ListItem
                  disablePadding
                  key={ type }
                  onClick={ () => onCreate( type ) }
                >
                  <ListItemButton>
                    <ListItemText primary={ name } />
                  </ListItemButton>
                </ListItem>
              );
            } )
          }
        </List>
      </AccordionDetails>
    </Accordion>
  );
};

export default PaneContextGroup;
