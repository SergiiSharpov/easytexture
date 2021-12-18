import { makeObservable, observable, computed, action } from 'mobx';
import { Vector2 } from 'three';
import Connection from './connection';

class IDGenerator {
  id = 0;

  get next() {
    return this.id++;
  }

  reset() {
    this.id = 0;
  }
}

const TypedNodes = {

};

export const NodeGroups = {

};

export const TypedComponents = {

};

export const registerNode = (type, nodeClass) => {
  TypedNodes[type] = nodeClass;
  //console.log(nodeClass.prototype.constructor.displayName, nodeClass.prototype.constructor.groupName);
  let group = nodeClass.prototype.constructor.groupName;
  let name = nodeClass.prototype.constructor.displayName;

  if (!NodeGroups[group]) {
    NodeGroups[group] = [];
  }

  NodeGroups[group].push({name, type});
}

export const registerComponent = (type, component) => {
  TypedComponents[type] = component;
}

class Tree {
  children = [];
  connections = [];

  ids = {};

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
  }

  disconnect(connectionId) {
    this.connections = this.connections.filter((conn) => (conn.id !== connectionId));
  }

  createNode(nodeType, position = new Vector2()) {
    if (TypedNodes[nodeType]) {
      if (!this.ids[nodeType]) {
        this.ids[nodeType] = new IDGenerator();
      }
      let name = nodeType + '_' + this.ids[nodeType].next;

      let node = new TypedNodes[nodeType]({name, position});
      node.id = name;

      this.children.push(node);
    }
  }

  removeNode(id) {
    this.children = this.children.filter((child) => (child.id !== id));
    this.connections = this.connections.filter((conn) => (conn.target !== id) && (conn.source !== id));
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

// Just import to make nodes registred
require('./nodeList');

export default Tree;