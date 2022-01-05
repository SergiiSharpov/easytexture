import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Vector2 } from 'three';
import { useZoomPanHelper } from 'react-flow-renderer';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';

import { GroupedNodes } from '../../../graph';
import PaneContextGroup from './PaneContextGroup';
import Tree from 'src/store/tree';
type IProps = {
  tree: Tree;
  event: any; /* @TODO replace to correct type here */
  onClose: () => void;
}

const PaneContextMenu = ( { onClose, event = null, tree }: IProps ) => {
  const ref = useRef( null );
  const positionRef = useRef( { x: -999999, y: -999999 } );

  const [itemFilter, setItemFilter] = useState( '' );

  const { project } = useZoomPanHelper();

  useEffect( () => {
    if ( event ) {
      let top = event.nativeEvent.offsetY;
      let left = event.nativeEvent.offsetX;

      positionRef.current.x = left;
      positionRef.current.y = top;

      top = Math.min( top, event.target.offsetHeight - ref.current.offsetHeight );
      left = Math.min( left, event.target.offsetWidth - ref.current.offsetWidth );

      ref.current.style.top = `${ top }px`;
      ref.current.style.left = `${ left }px`;
    }
  }, [event] );

  const onCreate = useCallback( ( type ) => {
    // console.log(project(positionRef.current));
    // console.log(type, event.target);
    let pos = project( positionRef.current );
    tree.createNode( type, new Vector2( pos.x, pos.y ) );

    onClose();
  }, [
    event,
    project,
    tree,
    onClose
  ] );

  const onFilterChange = useCallback( ( e ) => {
    setItemFilter( e.target.value );
  }, [] );

  if ( !event ) {
    return null;
  }

  return (
    <Paper
      // elevation={3}
      variant='outlined'
      square
      className='context-menu'
      style={ {
        // top, left,
        maxWidth: 240,
        width: 240,
        top: positionRef.current.y,
        left: positionRef.current.x
      } }
      ref={ ref }
    >
      <div className='node-base__header'>
        <div className='node-base__header__title'>Add node</div>
      </div>
      <div className='search-field'>
        <InputBase
          sx={ { ml: 1, flex: 1 } }
          className='search-node'
          placeholder='Search Node'
          inputProps={ { 'aria-label': 'search node' } }
          onChange={ onFilterChange }
          value={ itemFilter }
        />
        <IconButton aria-label='search'>
          <SearchIcon />
        </IconButton>
      </div>
      <div className='context-elements'>
        {Object.keys( GroupedNodes ).map( ( name ) => {
          if ( itemFilter ) {
            const groupHasFiltered = GroupedNodes[ name ]
              .filter( ( { name } ) => ( name.indexOf( itemFilter ) !== -1 ) ).length;
            if ( !groupHasFiltered ) {
              return null;
            }
          }

          return (
            <PaneContextGroup
              key={ name }
              group={ GroupedNodes[ name ] }
              name={ name }
              filter={ itemFilter }
              onCreate={ onCreate }
            />
          );
        } )}
      </div>
    </Paper>
  );
};

export default PaneContextMenu;
