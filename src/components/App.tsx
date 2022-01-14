import React from 'react';
import { observer } from 'mobx-react';
import { ToastContainer } from 'react-toastify';

import '../assets/css/App.css';
import '../assets/fonts/roboto/index.css';
import 'react-toastify/dist/ReactToastify.css';

import { createTheme, ThemeProvider } from '@mui/material';

import Workspace from 'src/containers/Workspace';
import ProjectsView from 'src/containers/ProjectsView';

const darkTheme = createTheme( { palette: { mode: 'dark' } } );


const App = observer( ( { env } ) => {

  return (
    <ThemeProvider theme={ darkTheme }>
      <div className='app-container'>

        {
          env.targetProject
            ? <ProjectsView env={ env }/>
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
