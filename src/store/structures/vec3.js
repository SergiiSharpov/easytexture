import { action, makeObservable, observable } from "mobx";
import { Vector3 } from "three";

class Vec3 extends Vector3 {
  constructor(...props) {
    super(...props);

    makeObservable(this, {
      x: observable,
      y: observable,
      z: observable,
      set: action,
      setX: action,
      setY: action,
      setZ: action
    });
  }
}

export default Vec3;