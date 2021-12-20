import { makeObservable, observable, computed, action, makeAutoObservable } from 'mobx';
import { Vector2 } from 'three';
import { FlowModelMap } from '../../graph';
import { GraphNodes } from '../../graph/const';
import { ShaderGraph } from '../../shadergen';
import IDGenerator from '../../utils/idGenerator';
import { getBaseMaterial } from '../../utils/simpleShaderMaterial';
import Connection from './connection';

class Tree {
  children = [];
  connections = [];

  ids = {};
  material = makeAutoObservable({
    value: getBaseMaterial(),
    set(material) {
      this.value = material;
    }
  });
  compiler = new ShaderGraph();

  materialKey = makeAutoObservable({
    value: '',
    setValue(value) {
      this.value = value;
    }
  });

  constructor() {
    makeObservable(this, {
      children: observable,
      connections: observable,
      flat: computed,
      createNode: action,
      removeNode: action,
      connect: action,
      disconnect: action,
      onConnect: action,
    });

    this.createNode(GraphNodes.Out.type, {});
  }

  hasConnection(props) {
    for (let conn of this.connections) {
      if (conn.equals(props)) {
        return true;
      }
    }

    return false;
  }

  getConnectionByTarget(props) {
    for (let conn of this.connections) {
      if (conn.target === props.target && conn.targetHandle === props.targetHandle) {
        return conn;
      }
    }

    return null;
  }

  onConnect = (props) => {
    if (this.hasConnection(props)) {
      return false;
    }

    let connectionToDelete = this.getConnectionByTarget(props);
    if (connectionToDelete) {
      this.disconnect(connectionToDelete.id);
    }

    this.connect(props);
    //this.connect(props.target, props.targetHandle || null, props.source, props.sourceHandle || null);
  }

  //target, targetHandle, source, sourceHandle
  connect(props) {
    let connection = new Connection(props);
    connection.id = '#c_' + props.target + (props.targetHandle || '') + '_' + props.source + (props.sourceHandle || '');

    this.connections.push(connection);

    this.compiler.updateGraph(this);
  }

  disconnect(connectionId) {
    this.connections = this.connections.filter((conn) => (conn.id !== connectionId));

    this.compiler.updateGraph(this);
  }

  createNode(nodeType, {x = 0, y = 0}) {
    console.log(FlowModelMap)
    if (FlowModelMap[nodeType]) {
      const NodeConstructor = FlowModelMap[nodeType];

      if (!this.ids[nodeType]) {
        this.ids[nodeType] = new IDGenerator();
      }
      
      let id = nodeType + '_' + this.ids[nodeType].next;
      let node = new NodeConstructor({id, position: new Vector2(x, y)});
      node.tree = this;

      this.children.push(node);
    }
  }

  removeNode(type, id) {
    if (type === GraphNodes.Out.type) {
      return false;
    }
    
    this.children = this.children.filter((child) => (child.id !== id));
    this.connections = this.connections.filter((conn) => (conn.target !== id) && (conn.source !== id));

    this.compiler.updateGraph(this);
  }

  getConnected(id) {
    const inputs = {};
    for (let conn of this.connections) {
      if (conn.source !== id) {
        inputs[conn.sourceHandle] = conn;
      }
    }

    return inputs;
  }

  get flat() {
    let result = [];

    for (let child of this.children) {
      result.push(child.flat);
    }

    for (let conn of this.connections) {
      result.push(conn.flat);
    }

    return result;
  }
}

export default Tree;