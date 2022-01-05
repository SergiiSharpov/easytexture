import { makeObservable, observable, computed } from 'mobx';
import Tree from 'src/store/tree';
import { Vector2 } from 'three';

class BaseNode {
  // Observables
  // name = '';
  id = '';

  position = new Vector2();

  value: any;

  // Non observables
  tree!: Tree;

  accepts = [new Set()];

  hasHeader = true;

  hasBody = true;

  constructor( { position = { x: 0, y: 0 }, id = '' } ) {
    makeObservable( this, {
      // name: observable,
      id: observable,
      flat: computed
    } );

    this.type = this.constructor.type;

    this.position.set( position.x, position.y );
    this.id = id;
  }

  static type = 'Node';

  get flat() {
    // console.log(this.constructor.type)
    return {
      id: this.id,
      type: ( this.constructor as typeof BaseNode ).type,
      data: { label: this.name, value: this.value },
      position: this.position,
      targetPosition: 'left',
      sourcePosition: 'right'
      // dragHandle: '.node-base__header'
    };
  }

  getFragmentHeader( uniforms = {} ) {
    return '';
  }

  getFragmentBody( graph ) {
    return '';
  }

  isValid( graph ) {
    return true;
  }

  depsInPlace( nodesInPlace ) {
    return true;
  }
}

export default BaseNode;
