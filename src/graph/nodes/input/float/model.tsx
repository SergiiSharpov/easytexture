import { makeAutoObservable } from 'mobx';
import { Vector4 } from 'three';

import { GraphNodes } from '../../../const';
import BaseNode from '../../../baseNode';

class FloatModel extends BaseNode {
  value = makeAutoObservable({
    value: 0.0,
    set(value) {
      this.value = value;
    }
  });

  constructor(...props) {
    super(...props);
  }

  static type = GraphNodes.Float.type;
}

export default FloatModel;