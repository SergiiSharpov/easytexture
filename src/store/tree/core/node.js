import { makeObservable, observable, computed, action } from 'mobx';
import { Vector2 } from 'three';

class Node {
  // Observables
  type = null;
  position = new Vector2();
  name = '';
  id = '';
  value = null;

  // Non observables
  accepts = new Set();
  hasHeader = true;
  hasBody = true;

  constructor({position = {x: 0, y: 0}, name = ''}) {
    makeObservable(this, {
      name: observable,
      id: observable,
      flat: computed
    });

    this.position.set(position.x, position.y);
    this.name = name;
  }

  static displayName = 'Node';
  static groupName = 'None';

  get flat() {
    return {
      id: this.id, type: this.type,
      data: { label: this.name, value: this.value },
      position: this.position,
      targetPosition: 'left', sourcePosition: 'right',
      // dragHandle: '.node-base__header'
    };
  }

  getFragmentHeader(graph) {
    return '';
  }

  getFragmentBody(graph) {
    return '';
  }

  isValid(graph) {
    return true;
  }
}

export default Node;