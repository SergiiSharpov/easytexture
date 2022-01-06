import React from 'react';
import { observer } from 'mobx-react';

import '../assets/css/App.css';
import '../assets/fonts/roboto/index.css';

import { createTheme, ThemeProvider } from '@mui/material';

import Tree from '../store/tree';
import Project from 'src/containers/Project';
import Workspace from 'src/containers/Workspace';


const darkTheme = createTheme( { palette: { mode: 'dark' } } );

const tree = new Tree();

const App = observer( ( { env } ) => {

  return (
    <ThemeProvider theme={ darkTheme }>
      <div className='app-container'>

        {
          env.targetProject
            ? <Project tree={ tree } />
            : <Workspace env={ env }/>
        }

      </div>
    </ThemeProvider>
  );
} );

export default App;
