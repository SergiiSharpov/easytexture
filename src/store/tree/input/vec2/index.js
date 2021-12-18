import { makeObservable, observable, computed, action, override } from 'mobx';
import Vec2 from '../../../structures/vec2';
import { NodeTypes } from '../../const';
import Node from '../../core/node';
import { registerNode } from '../../core/tree';

export class Vec2Node extends Node {
  type = NodeTypes.Vector2;
  value = new Vec2();

  hasBody = false;

  constructor(...props) {
    super(...props);
  }

  static displayName = 'Vector 2';
  static groupName = 'Input';

  getFragmentHeader(graph) {
    return '';
  }
}

registerNode(NodeTypes.Vector2, Vec2Node);