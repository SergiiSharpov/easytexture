import { makeObservable, observable, computed, action, override } from 'mobx';
import { Vector3 } from 'three';
import Vec3 from '../../../structures/vec3';
import { NodeTypes } from '../../const';
import Node from '../../core/node';
import { registerNode } from '../../core/tree';

export class Vec3Node extends Node {
  type = NodeTypes.Vector3;
  value = new Vec3();

  hasBody = false;

  constructor(...props) {
    super(...props);
  }

  static displayName = 'Vector 3';
  static groupName = 'Input';

  getFragmentHeader(graph) {
    return '';
  }
}

registerNode(NodeTypes.Vector3, Vec3Node);