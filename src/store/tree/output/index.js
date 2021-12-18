import { makeObservable, observable, computed, action } from 'mobx';
import { NodeTypes } from '../const';
import Node from '../core/node';
import { registerNode } from '../core/tree';

export class OutNode extends Node {
  type = NodeTypes.Out;
  hasHeader = false;

  constructor(...props) {
    super(...props);
  }

  static displayName = 'Color output';
  static groupName = 'Output';

  getFragmentBody(graph) {
    return '';
  }
}

registerNode(NodeTypes.Out, OutNode);