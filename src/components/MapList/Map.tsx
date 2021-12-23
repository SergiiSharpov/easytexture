import React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';

type Props = {
  name : string;
  src: any; /* @TODO replace to correct type here */
  selected?: boolean;
}

const Map = ( { name, src, selected = false }: Props ) => {
  return (
    <ListItemButton selected={ selected } className='map-item'>
      <ListItemAvatar>
        <Avatar alt='Diffuse Map' src={ src } variant='rounded' />
      </ListItemAvatar>
      <ListItemText primary={ name } />
    </ListItemButton>
  );
};
export default Map;
