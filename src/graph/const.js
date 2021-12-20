

export const GraphNodes = {
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
  },
};

export const GroupedGraphNodes = {};

Object.values(GraphNodes).map( (node) => {
  if (!GroupedGraphNodes[node.group]) {
    GroupedGraphNodes[node.group] = [];
  }

  GroupedGraphNodes[node.group].push(node);
});