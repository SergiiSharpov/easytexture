import { ReactNode } from 'react';
import {
  Vec4Model,
  Vec4View,
  FloatModel,
  FloatView,
  OutModel,
  OutView
} from './nodes';

export type ModelConstructor = typeof FloatModel | typeof Vec4Model | typeof OutModel;
export type Model = FloatModel | Vec4Model | OutModel;
export type View = ReactNode;
export type nodeData = {
  type: graphNodeType,
  group: graphNodeGroup,
  name: string,
  model: ModelConstructor,
  view: View
};

const GraphNodes = [
  {
    type: 'out',
    group: 'Output',
    name: 'Color output',
    model: OutModel,
    view: OutView
  },
  {
    type: 'float',
    group: 'Input',
    name: 'Float',
    model: FloatModel,
    view: FloatView
  },
  {
    type: 'vec2',
    group: 'Input',
    name: 'Vector 2',
    model: OutModel,
    view: OutView
  },
  {
    type: 'vec3',
    group: 'Input',
    name: 'Vector 3',
    model: OutModel,
    view: OutView
  },
  {
    type: 'vec4',
    group: 'Input',
    name: 'Vector 4',
    model: Vec4Model,
    view: Vec4View
  },
  {
    type: 'vectorMath',
    group: 'Math',
    name: 'Vector math',
    model: OutModel,
    view: OutView
  }
] as const;

const arrGraphNodesValuesTypes = GraphNodes.map( ( v ) => v.type );
const arrGraphNodesValuesGroups = GraphNodes.map( ( v ) => v.group );
export type graphNodeType = typeof arrGraphNodesValuesTypes[ number ];
export type graphNodeGroup = typeof arrGraphNodesValuesGroups[ number ];

const NodesTyped = GraphNodes as unknown as nodeData[];
const GroupedNodes = {} as {[key:string]: nodeData[] };
const Nodes: {[key: string]: nodeData} = {};
const Views: {[key: string]: View} = {};
const Models: {[key: string]: ModelConstructor} = {};
NodesTyped.forEach( ( node ) => {
  if ( !GroupedNodes[ node.group ] ) {
    GroupedNodes[ node.group ] = [] as nodeData[];
  }

  GroupedNodes[ node.group ].push( node );
  Nodes[ node.type ] = node;
  Views[ node.type ] = node.view;
  Models[ node.type ] = node.model;
} );

export {
  Nodes,
  GroupedNodes,
  Views,
  Models
};

