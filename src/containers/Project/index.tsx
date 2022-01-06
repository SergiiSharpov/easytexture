import React from 'react';

import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import ButtonBase from '@mui/material/ButtonBase';

import Flow from '../../components/Flow';
import MapList from '../../components/MapList';
import Preview from '../../components/Preview';


const Project = ( { tree } ) => {

  return (
    <div>
      <CssBaseline />
      <Container
        disableGutters={ true }
        sx={ { display: 'flex' } }
        maxWidth={ false }
        className='project-container'
      >
        <Box component = 'div' sx={ { width: 300, flexGrow: 0, flexShrink: 0 } } className='menu-container'>
          <div className='texture-preview-container'>
            <ButtonBase>
              <div className='texture-preview'>Preview</div>
            </ButtonBase>
          </div>
          <MapList/>
        </Box>
        <Container
          disableGutters={ true }
          sx={ { display: 'flex' } }
          maxWidth={ false }
          className='workflow-container'
        >
          <Box component = 'div' sx={ { width: '100%', flexGrow: 0, flexShrink: 0 } } className='preview-container'>
            <Preview tree={ tree }/>
          </Box>
          <Box component = 'div' sx={ { width: '100%' } } className='main-container'>
            <Flow tree={ tree }/>
          </Box>
        </Container>
      </Container>
    </div>
  );
};

export default Project;
