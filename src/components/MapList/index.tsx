import React from 'react';
import List from '@mui/material/List';
import Map from './Map';
import diffuseMap from './../../assets/images/preview/diffuse.jpg';
import aoMap from './../../assets/images/preview/ao.jpg';
import normalMap from './../../assets/images/preview/normal.jpg';
import heightMap from './../../assets/images/preview/height.jpg';
import metallicMap from './../../assets/images/preview/metallic.jpg';
import roughnessMap from './../../assets/images/preview/smoothness.jpg';

// background.paper
const MapList = () => {
  return (
    <div>
      {/* <Typography sx={{ mt: 2, mb: 1, pl: 2 }} variant="h6" component="div">Maps</Typography> */}
      <List
        sx={ { width: '100%', maxWidth: 300, bgcolor: '#000000' } }
        component='nav'
      >
        <Map name='Diffuse' src={ diffuseMap } selected={ true } />
        <Map name='Height' src={ heightMap } />
        <Map name='Normal' src={ normalMap } />
        <Map name='Metallic' src={ metallicMap } />
        <Map name='Roghness' src={ roughnessMap } />
        <Map name='Diffuse' src={ aoMap } />
      </List>
    </div>
  );
};

//  secondary="Jan 9, 2014"

export default MapList;
