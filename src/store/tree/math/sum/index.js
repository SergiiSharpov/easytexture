import { makeObservable, observable, computed, action } from 'mobx';
import { NodeTypes } from '../../const';
import Node from '../../core/node';
import { registerNode } from '../../core/tree';

export class SumNode extends Node {
  type = NodeTypes.Sum;
  hasBody = false;

  constructor(...props) {
    super(...props);
  }

  static displayName = 'Sum';
  static groupName = 'Math';

  getFragmentHeader(graph) {
    return '';
  }
}

registerNode(NodeTypes.Sum, SumNode);