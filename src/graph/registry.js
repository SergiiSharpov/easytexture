

const NodeMap = {};

export const NodeRegistry = {
  registerNode: (model, view) => {
    NodeMap[model.type] = {
      model, view
    }
  },
  
  hasNode: (type) => {
    return Boolean(NodeRegistry[type]);
  },
  
  getNode: (type) => {
    return NodeRegistry[type];
  },

  get: () => NodeMap,

  getViews: () => {
    const result = {};

    for (let key in NodeMap) {
      result[key] = NodeMap[key].view;
    }

    return result;
  },

  getConstructors: () => {
    const result = {};

    for (let key in NodeMap) {
      result[key] = NodeMap[key].model;
    }

    return result;
  }
};