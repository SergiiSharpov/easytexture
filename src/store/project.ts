/* eslint-disable no-sync */
import path from 'path';
import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';
import { remote } from 'electron';
import { makeObservable, observable, computed, action, makeAutoObservable, flow } from 'mobx';

const { dialog, getCurrentWindow } = remote;

class Project {
  // Directory, if empty then isn't saved yet
  directory = '';

  // Poject name, if empty then isn't saved yet
  name = '';

  // Images
  images = [];

  // Shader maps
  maps = [];

  id = uuidv4();

  constructor() {
    makeObservable( this, {
      directory: observable,
      name: observable,
      images: observable,
      maps: observable,

      setName: action,
      setDirectory: action,

      // create: action,
      // open: action,
      save: action
      // delete: action,
      // close: action,
      // openFromFile: action,
      // loadProjectsFromMemory: action,
      // updateListedProjects: action,

      // setOpenedProjects: action,
      // setTargetProject: action
    } );
  }

  setName( name ) {
    this.name = name;
  }

  setDirectory( directory ) {
    this.directory = directory;
  }

  toJSON() {
    return {
      // There should be each image toJSON
      images: this.images,
      // There should be each shader tree toJSON
      maps: this.maps
    };
  }

  static fromJSON( json ) {
    return new Project();
  }

  fileExists() {
    return this.directory && this.name;
  }

  get file() {
    return path.join( this.directory, `${ this.name }.easytexture` );
  }

  get descriptor() {
    return {
      name: this.name,
      directory: this.directory
    };
  }

  equals( project ) {
    return ( project.name === this.name && project.directory === this.directory );
  }

  save = async () => {
    if ( !this.fileExists() ) {
      const resultPath = dialog.showSaveDialogSync(
        getCurrentWindow(), { title: 'Save project', filters: [{ name: 'easy file', extensions: ['easytexture'] }] }
      );

      if ( resultPath ) {
        const exists = fs.existsSync( resultPath );

        if ( exists ) {
          const parsed = path.parse( resultPath );

          this.directory = parsed.dir;
          this.name = parsed.name;
        } else {
          const parsed = path.parse( resultPath );

          const nextDir = path.join( parsed.dir, parsed.name );

          // Check if dir not exists
          if ( fs.existsSync( nextDir ) ) {
            console.log( 'Dir already exists' );

            return false;
          }

          fs.mkdirSync( nextDir );


          this.directory = nextDir;
          this.name = parsed.name;
        }
      } else {
        return false;
      }
    }

    await fs.promises.writeFile( this.file, JSON.stringify( this.toJSON(), null, 2 ) );

    return true;
  }
}

export default Project;
