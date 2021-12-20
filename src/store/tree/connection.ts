import { makeObservable, observable, computed, action } from 'mobx';

class Connection {
  id = '';
  target = null;
  targetHandle = null;
  source = null;
  sourceHandle = null;

  constructor({target = null, targetHandle = null, source = null, sourceHandle = null}) {
    makeObservable(this, {
      source: observable,
      sourceHandle: observable,
      target: observable,
      targetHandle: observable,
      id: observable,
      flat: computed
    });

    this.target = target;
    this.targetHandle = targetHandle;
    this.source = source;
    this.sourceHandle = sourceHandle;
  }

  equals(props) {
    return (
          props.target === this.target
      &&  props.targetHandle === this.targetHandle
      &&  props.source === this.source
      &&  props.sourceHandle === this.sourceHandle
    )
  }

  get flat() {
    return {
      id: this.id,
      source: this.source,
      sourceHandle: this.sourceHandle,
      target: this.target,
      targetHandle: this.targetHandle,
      animated: false,
    }
  }
};

export default Connection;