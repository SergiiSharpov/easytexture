import { remote } from 'electron';
import env from './env';

const { app, Menu } = remote;
console.log( remote );

const isMac = process.platform === 'darwin';

const template = [
  // { role: 'appMenu' }
  // ...( isMac ? [
  //   {
  //     label: app.name,
  //     submenu: [
  //       { role: 'about' },
  //       { type: 'separator' },
  //       { role: 'services' },
  //       { type: 'separator' },
  //       { role: 'hide' },
  //       { role: 'hideOthers' },
  //       { role: 'unhide' },
  //       { type: 'separator' },
  //       { role: 'quit' }
  //     ]
  //   }
  // ] : [] ),
  // { role: 'fileMenu' }
  {
    label: 'File',
    submenu: [
      {
        label: 'Open',
        click: async () => {}
      },
      {
        label: 'Save',
        accelerator: 'Ctrl+S',
        click: env.save
      },
      { type: 'separator' },
      isMac ? { role: 'close' } : { role: 'quit' }
    ]
  },
  // { role: 'editMenu' }
  {
    label: 'Edit',
    submenu: [
      { role: 'undo' },
      { role: 'redo' },
      { type: 'separator' },
      { role: 'cut' },
      { role: 'copy' },
      { role: 'paste' },
      ...( isMac ? [
        { role: 'pasteAndMatchStyle' },
        { role: 'delete' },
        { role: 'selectAll' },
        { type: 'separator' },
        {
          label: 'Speech',
          submenu: [{ role: 'startSpeaking' }, { role: 'stopSpeaking' }]
        }
      ] : [
        { role: 'delete' },
        { type: 'separator' },
        { role: 'selectAll' }
      ] )
    ]
  },
  // { role: 'viewMenu' }
  {
    label: 'View',
    submenu: [
      { role: 'reload' },
      { role: 'forceReload' },
      { role: 'toggleDevTools' },
      { type: 'separator' },
      { role: 'resetZoom' },
      { role: 'zoomIn' },
      { role: 'zoomOut' },
      { type: 'separator' },
      { role: 'togglefullscreen' }
    ]
  },
  // { role: 'windowMenu' }
  {
    label: 'Window',
    submenu: [
      { role: 'minimize' },
      { role: 'zoom' },
      ...( isMac ? [
        { type: 'separator' },
        { role: 'front' },
        { type: 'separator' },
        { role: 'window' }
      ] : [{ role: 'close' }] )
    ]
  },
  {
    role: 'help',
    submenu: [
      {
        label: 'Learn More',
        click: async () => {
          // const { shell } = require( 'electron' );
          // await shell.openExternal( 'https://electronjs.org' );
        }
      }
    ]
  }
];

export const AppMenu = Menu.buildFromTemplate( template );