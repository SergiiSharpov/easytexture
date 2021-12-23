
const GraphNodes = {
  Out: {
    type: 'out',
    group: 'Output',
    name: 'Color output'
  },
  Float: {
    type: 'float',
    group: 'Input',
    name: 'Float'
  },
  Vector2: {
    type: 'vec2',
    group: 'Input',
    name: 'Vector 2'
  },
  Vector3: {
    type: 'vec3',
    group: 'Input',
    name: 'Vector 3'
  },
  Vector4: {
    type: 'vec4',
    group: 'Input',
    name: 'Vector 4'
  },
  VectorMath: {
    type: 'vectorMath',
    group: 'Math',
    name: 'Vector math'
  }
} as const;

const arrGraphNodesValuesTypes = Object.values( GraphNodes ).map( ( v ) => v.type );
const arrGraphNodesValuesGroups = Object.values( GraphNodes ).map( ( v ) => v.group );

export type graphNodeType = typeof arrGraphNodesValuesTypes[ number ];
export type graphNodeGroup = typeof arrGraphNodesValuesGroups[ number ];
export type graphNode = {
  type: graphNodeType,
  group: graphNodeGroup,
  name: string
}
export type graphNodes = {
  [key:string]: graphNode
}

const GroupedGraphNodes = {} as {[key:string]: graphNode[] };
( Object.values( GraphNodes as graphNodes ) ).forEach( ( node ) => {
  if ( !GroupedGraphNodes[ node.group ] ) {
    GroupedGraphNodes[ node.group ] = [] as graphNode[];
  }

  GroupedGraphNodes[ node.group ].push( node );
} );
const GraphNodesTyped = GraphNodes as graphNodes;

export {
  GroupedGraphNodes,
  GraphNodesTyped as GraphNodes
};
