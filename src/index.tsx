import React from 'react';
import { remote } from 'electron';
import { render } from 'react-dom';
import App from 'components/App';
import Env from 'store/env';

// Set app menu
import { AppMenu } from './store/applicationMenu';
const { Menu } = remote;
Menu.setApplicationMenu( AppMenu );

// Since we are using HtmlWebpackPlugin WITHOUT a template, we should create our own root node in the body element before rendering into it
let root = document.createElement( 'div' );

root.id = 'root';
document.body.appendChild( root );

// Now we can render our application into it
render( <App env={ Env } />, document.getElementById( 'root' ) );
