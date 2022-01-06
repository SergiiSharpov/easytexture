import path from 'path';
import fs from 'fs';
import { remote } from 'electron';
import { makeObservable, observable, computed, action, makeAutoObservable } from 'mobx';

const { dialog, getCurrentWindow } = remote;

class Project {
  directory = '';// Directory, if empty then isn't saved yet

  name = '';// Poject name, if empty then isn't saved yet

  images = [];// Images

  maps = [];// Shader maps

  toJSON() {
    return {
      images: this.images, // There should be each image toJSON
      maps: this.maps// There should be each shader tree toJSON
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

  save = async () => {
    if ( !this.fileExists() ) {
      const resultPath = dialog.showSaveDialogSync(
        getCurrentWindow(), { title: 'Save project', filters: [{ name: 'easy file', extensions: ['easytexture'] }] }
      );

      if ( resultPath ) {
        const parsed = path.parse( resultPath );

        this.directory = parsed.dir;
        this.name = parsed.name;
      } else {
        return false;
      }
    }

    await fs.promises.writeFile( this.file, JSON.stringify( this.toJSON(), null, 2 ) );

    return true;
  }
}

export default Project;
