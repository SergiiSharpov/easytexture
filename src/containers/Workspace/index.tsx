import React from 'react';
import moment from 'moment';

import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import ButtonBase from '@mui/material/ButtonBase';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Paper from '@mui/material/Paper';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';

import FolderOffIcon from '@mui/icons-material/FolderOff';
import FolderIcon from '@mui/icons-material/Folder';

import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

import { observer } from 'mobx-react';

const ProjectsListOld = observer( () => {

  return (
    <>
      <ListItem disablePadding>
        <ListItemButton>
          <ListItemAvatar>
            <Avatar>
              <FolderIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary='Project 2' secondary={
            moment().startOf( 'hour' )
              .fromNow()
          } />
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding>
        <ListItemButton>
          <ListItemAvatar>
            <Avatar>
              <FolderIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary='Project 2' secondary={
            moment().startOf( 'hour' )
              .fromNow()
          } />
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding>
        <ListItemButton>
          <ListItemAvatar>
            <Avatar>
              <FolderIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary='Project 2' secondary={
            moment().startOf( 'hour' )
              .fromNow()
          } />
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding>
        <ListItemButton>
          <ListItemAvatar>
            <Avatar>
              <FolderIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary='Project 2' secondary={
            moment().startOf( 'hour' )
              .fromNow()
          } />
        </ListItemButton>
      </ListItem>
    </>
  );
} );

const ProjectsList = observer( ( { env } ) => {

  return env.projectsList.map( ( project ) => {
    const modified = project.lastUpdate ? moment( project.lastUpdate ).fromNow() : 'Project doesn\'t exists';

    return (
      <ListItem
        disablePadding
        key={ project.directory + project.name }
        secondaryAction={
          <IconButton
            edge='end'
            aria-label='delete'
            onClick={ () => env.delete( project ) }
          >
            <DeleteIcon />
          </IconButton>
        }
      >
        <ListItemButton
          onClick={ () => env.open( project ) }
        >
          <ListItemAvatar>
            <Avatar>
              {project.lastUpdate ? <FolderIcon /> : <FolderOffIcon/>}
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary={ project.name } secondary={ modified } />
        </ListItemButton>
      </ListItem>
    );
  } );
} );

const NoProjects = () => {

  return (
    <div className='empty-project-container'>
      <span>No projects yet ;(</span>
    </div>
  );
};

const Workspace = observer( ( { env } ) => {

  return (
    <div className='workspace'>
      <CssBaseline />
      <Paper elevation={ 1 } className='workspace-panel'>
        <div className='workspace-header'>Welcome</div>

        <List sx={ { bgcolor: 'background.paper' } } className='projects-list'>
          {
            env.projectsList.length
              ? <ProjectsList env={ env } />
              : <NoProjects/>
          }
        </List>

        <ButtonGroup variant='outlined' className='projects-buttons'>
          <Button color='primary' onClick={ env.create }>Create project</Button>
          <Button color='primary' onClick={ env.openFromFile }>Open project</Button>
        </ButtonGroup>
      </Paper>
    </div>
  );
} );

export default Workspace;
