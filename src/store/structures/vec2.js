import { action, makeObservable, observable } from "mobx";
import { Vector2 } from "three";

class Vec2 extends Vector2 {
  constructor(...props) {
    super(...props);

    makeObservable(this, {
      x: observable,
      y: observable,
      set: action,
      setX: action,
      setY: action
    });
  }
}

export default Vec2;