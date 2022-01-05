import { ReactNode } from 'react';
import { graphNodeType } from './const';
import { modelConstructor } from './nodes/types';


const NodeMap : {
  [key in graphNodeType]? : {model : modelConstructor, view: ReactNode}
} = {};

export const NodeRegistry = {
  registerNode: ( model : modelConstructor, view: ReactNode ) => {
    NodeMap[ model.type ] = { model, view };
  },

  // hasNode: ( type ) => {
  //   return Boolean( NodeRegistry[ type ] );
  // },

  // getNode: ( type ) => {
  //   return NodeRegistry[ type ];
  // },

  get: () => NodeMap,

  getViews: () => {
    const result: { [ key in graphNodeType ] : ReactNode} = {};

    for ( let key in NodeMap ) {
      result[ key ] = NodeMap[ key ].view;
    }

    return result;
  },

  getModels: () => {
    const result : { [ key in graphNodeType ]: modelConstructor } = {};

    for ( let key in NodeMap ) {
      result[ key ] = NodeMap[ key ].model;
    }

    return result;
  }
};
