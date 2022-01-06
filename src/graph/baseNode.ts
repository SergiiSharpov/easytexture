import { makeObservable, observable, computed } from 'mobx';
import Tree from 'store/tree';
import { Vector2 } from 'three';
import { graphNodeType } from '.';

type IProps = {
  position: Vector2;
  id: string;
  type: graphNodeType;
}

interface IShaderMethods {
  getFragmentHeader: ( uniforms: object )=> string;
  getFragmentBody: ( /* graph: any*/ )=> string;
}
class BaseNode
implements IShaderMethods {
  // Observables
  // name = '';
  id = '';

  type: graphNodeType;

  position = new Vector2();

  value: any;

  // Non observables
  tree!: Tree;

  accepts = [new Set()];

  hasHeader = true;

  hasBody = true;

  constructor( { position = new Vector2(), id = '', type }: IProps ) {
    makeObservable( this, {
      // name: observable,
      id: observable,
      flat: computed
    } );

    // this.type = this.constructor.type;

    this.position.set( position.x, position.y );
    this.id = id;
    this.type = type;
  }

  // static type = 'Node';

  get flat() {
    // console.log(this.constructor.type)
    return {
      id: this.id,
      type: this.type,
      data: { label: this.name, value: this.value },
      position: this.position,
      targetPosition: 'left',
      sourcePosition: 'right'
      // dragHandle: '.node-base__header'
    };
  }

  getFragmentHeader( uniforms: object ) {
    return '';
  }

  getFragmentBody( /* graph*/ ) {
    return '';
  }

  isValid() {
    return true;
  }

  isDepsPresent( nodesInPlace ) {
    return true;
  }
}

export default BaseNode;
