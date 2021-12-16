import React from 'react'

import Flow from './Flow';
import MapList from './MapList';

import '../assets/css/App.css'

import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

import TouchRipple from '@mui/material/ButtonBase/TouchRipple';
import ButtonBase from '@mui/material/ButtonBase';

import { createTheme, ThemeProvider } from '@mui/material';


const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

console.log(darkTheme)

function App() {
  return (
    <div className='app-container'>
      {/* <h1>Hello, Electron!</h1>

      <p>I hope you enjoy using basic-electron-react-boilerplate to start your dev off right!</p> */}

      {/* <Flow/> */}
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <Container disableGutters={true} sx={{ display: 'flex' }} maxWidth={false} className='project-container'>
          <Box sx={{width: 300, flexGrow: 0, flexShrink: 0}} className='menu-container'>
            <div className='texture-preview-container'>
              <ButtonBase>
                <div className='texture-preview'>Preview</div>
              </ButtonBase>
            </div>
            <MapList/>
          </Box>
          <Container disableGutters={true} sx={{ display: 'flex' }} maxWidth={false} className='workflow-container'>
            <Box sx={{width: '100%', flexGrow: 0, flexShrink: 0}} className='preview-container'>Preview</Box>
            <Box sx={{width: '100%'}} className='main-container'>
              <Flow/>
            </Box>
          </Container>
        </Container>
      </ThemeProvider>
    </div>
  )
}

export default App
