import { action, makeObservable, observable } from "mobx";

class Float {
  value = 0.0;

  constructor() {

    makeObservable(this, {
      value: observable,
      set: action
    });
  }

  set(value) {
    this.value = value;
  }
}

export default Float;