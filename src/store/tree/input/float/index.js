import { makeObservable, observable, computed, action, override } from 'mobx';
import Float from '../../../structures/float';
import { NodeTypes } from '../../const';
import Node from '../../core/node';
import { registerNode } from '../../core/tree';

export class FloatNode extends Node {
  type = NodeTypes.Float;
  value = new Float();

  hasBody = false;

  constructor(...props) {
    super(...props);
  }

  static displayName = 'Float';
  static groupName = 'Input';

  getFragmentHeader(graph) {
    return '';
  }
}

registerNode(NodeTypes.Float, FloatNode);