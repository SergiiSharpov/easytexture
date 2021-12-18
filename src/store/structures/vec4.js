import { action, makeObservable, observable } from "mobx";
import { Vector4 } from "three";

class Vec4 extends Vector4 {
  constructor(...props) {
    super(...props);

    makeObservable(this, {
      x: observable,
      y: observable,
      z: observable,
      w: observable,
      set: action,
      setX: action,
      setY: action,
      setZ: action,
      setW: action
    });
  }
}

export default Vec4;