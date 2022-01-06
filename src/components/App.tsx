import React from 'react';
import { observer } from 'mobx-react';
import { ToastContainer } from 'react-toastify';

import '../assets/css/App.css';
import '../assets/fonts/roboto/index.css';
import 'react-toastify/dist/ReactToastify.css';

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

        <ToastContainer
          position='top-right'
          autoClose={ 5000 }
          hideProgressBar={ false }
          newestOnTop={ false }
          closeOnClick
          rtl={ false }
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </div>
    </ThemeProvider>
  );
} );

export default App;
