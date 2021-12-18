import { makeObservable, observable, computed, action, override } from 'mobx';
import Vec4 from '../../../structures/vec4';
import { NodeTypes } from '../../const';
import Node from '../../core/node';
import { registerNode } from '../../core/tree';

export class Vec4Node extends Node {
  type = NodeTypes.Vector4;
  value = new Vec4();

  hasBody = false;

  constructor(...props) {
    super(...props);
  }

  static displayName = 'Vector 4';
  static groupName = 'Input';

  getFragmentHeader(graph) {
    return '';
  }
}

registerNode(NodeTypes.Vector4, Vec4Node);