import path from 'path';
import { existsSync, statSync, readFileSync } from 'fs';
import { remote } from 'electron';
import { makeObservable, observable, computed, action, makeAutoObservable } from 'mobx';
import { toast } from 'react-toastify';
import Project from './project';


const { dialog, getCurrentWindow } = remote;

interface ListedProject {
  name: string;
  directory: string;
  lastUpdate: null | Date;
  fileExist: boolean;
}

class Env {
  projectsList : Array<ListedProject> = [];

  openedProjects : Array<Project> = [];

  targetProject : ( null | Project ) = null;

  constructor() {
    makeObservable( this, {
      projectsList: observable,
      openedProjects: observable,
      targetProject: observable,
      create: action,
      open: action,
      save: action,
      delete: action,
      close: action,
      openFromFile: action,
      loadProjectsFromMemory: action,
      updateListedProjects: action,

      setOpenedProjects: action,
      setTargetProject: action
    } );

    this.loadProjectsFromMemory();
  }

  loadProjectsFromMemory() {
    const saved = localStorage.getItem( 'projectsList' );
    const target = localStorage.getItem( 'targetProject' );
    const opened = localStorage.getItem( 'openedProjects' );

    if ( saved ) {
      try {
        const obj = JSON.parse( saved );
        this.projectsList = obj;
      } catch( e ) {
        this.projectsList = [];
      }
    } else {
      this.projectsList = [];
    }

    this.updateListedProjects();

    if ( opened ) {
      try {
        const obj = JSON.parse( opened );
        for ( let projFile of obj ) {
          const listed = this.projectsList.find( ( proj ) => ( proj.name === projFile.name && proj.directory === projFile.directory ) );

          if ( listed ) {
            this.open( listed, false );
          }
        }
      } catch( e ) {
        console.warn( 'No projects or data corrupted' );
      }
    }


    if ( target ) {
      try {
        const obj = JSON.parse( target );

        const targetProject = this.openedProjects.find(
          ( proj ) => ( proj.name === obj.value.name && proj.directory === obj.value.directory )
        );

        if ( targetProject ) {
          this.targetProject = targetProject;
        }

      } catch( e ) {
        console.warn( 'No target project or data corrupted' );
      }
    }

    this.saveProjectsToMemory();

    console.log( this );
  }

  saveProjectsToMemory() {
    localStorage.setItem( 'projectsList', JSON.stringify( this.projectsList, null, 2 ) );

    const opened = [];
    for ( let project of this.openedProjects ) {
      if ( project.fileExists() ) {
        opened.push( project.descriptor );
      }
    }

    localStorage.setItem( 'openedProjects', JSON.stringify( opened, null, 2 ) );
    localStorage.setItem( 'targetProject',
      JSON.stringify( { value: this.targetProject ? this.targetProject.descriptor : null }, null, 2 )
    );
  }

  updateListedProjects = () => {
    for ( let listed of this.projectsList ) {
      const filePath = path.join( listed.directory, `${ listed.name }.easytexture` );

      const available = existsSync( filePath );

      if ( available ) {
        listed.lastUpdate = statSync( filePath ).mtime;
      } else {
        listed.fileExist = false;
      }
    }
  }

  hasSavedProject( project : ListedProject ) {
    for ( let listed of this.projectsList ) {
      if ( listed.name === project.name && listed.directory === project.directory ) {
        return true;
      }
    }

    return false;
  }

  setOpenedProjects = ( projects ) => {
    this.openedProjects = projects;
  }

  setTargetProject = ( opened ) => {
    this.targetProject = opened;
  }

  create = () => {
    const project = new Project();

    this.openedProjects.push( project );
    this.targetProject = project;
  }

  close = ( project ) => {
    const opened = this.openedProjects.filter( ( target ) => target.id !== project.id );
    this.openedProjects = opened;

    if ( this.targetProject && this.targetProject.equals( project ) ) {
      this.targetProject = this.openedProjects.length ? this.openedProjects[ this.openedProjects.length - 1 ] : null;
    }

    this.saveProjectsToMemory();
  }

  open = ( listed : ListedProject, focus = true ) => {
    const filePath = path.join( listed.directory, `${ listed.name }.easytexture` );

    const opened = this.openedProjects.find(
      ( proj ) => ( proj.descriptor.name === listed.name && proj.descriptor.directory === listed.directory )
    );

    if ( opened ) {
      if ( focus ) {
        this.targetProject = opened;
      }

      return false;
    }

    const available = existsSync( filePath );

    if ( available ) {
      const content = readFileSync( filePath );

      try {
        const data = JSON.parse( content.toString() );

        const project = Project.fromJSON( data );
        project.directory = listed.directory;
        project.name = listed.name;

        this.openedProjects.push( project );
        if ( focus ) {
          this.targetProject = project;
        }
      } catch ( e ) {
        console.log( 'Project opening error happened' );

        return false;
      }

      this.save( false );

      this.saveProjectsToMemory();
      this.updateListedProjects();

      return true;
    }

    listed.fileExist = false;
    toast.error( 'Project seems to be broken', {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'dark'
    } );


    return false;
  }

  openFromFile = () => {
    // eslint-disable-next-line no-sync
    const resultPath = dialog.showOpenDialogSync(
      getCurrentWindow(), { title: 'Open project', filters: [{ name: 'easy file', extensions: ['easytexture'] }] }
    );

    if ( resultPath ) {
      const parsed = path.parse( resultPath[ 0 ] );

      const listed = {
        name: parsed.name,
        directory: parsed.dir,
        fileExist: true,
        lastUpdate: null
      };

      if ( !this.hasSavedProject( listed ) ) {
        this.projectsList.push( listed );
      }

      this.open( listed );

      return true;
    }

    return false;
  }

  // Deletes listed project, not actual files
  delete = ( project : Project ) => {
    this.projectsList = this.projectsList.filter( ( listed ) => {
      if ( listed.name === project.name && listed.directory === project.directory ) {
        return false;
      }

      return true;
    } );
    this.saveProjectsToMemory();
  }

  // Saves opened project
  save = async ( notify = true ) => {
    if ( this.targetProject === null ) {
      return false;
    }

    try {
      console.log( 'WILL SAVE' );

      const saved = await this.targetProject.save();

      console.log( 'SAVED: ', saved );

      if ( saved ) {
        if ( !this.hasSavedProject( this.targetProject ) ) {
          this.projectsList.push( {
            name: this.targetProject.name,
            directory: this.targetProject.directory,
            fileExist: true,
            lastUpdate: null
          } );
        }

        this.saveProjectsToMemory();
        this.updateListedProjects();

        console.log( 'Project saved' );
        if ( notify ) {
          toast.success( 'Saved', {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'dark'
          } );
        }
      } else {
        console.log( 'Saving canceled' );
      }
    } catch ( e ) {
      toast.error( 'Saving error happened', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark'
      } );

      return false;
    }

    return true;
  }
}

// Single instance per application
export default new Env();
