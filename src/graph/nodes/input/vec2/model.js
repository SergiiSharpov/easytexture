/* eslint-disable no-useless-constructor */
import { makeAutoObservable } from 'mobx';
import { Vector2 } from 'three';

import { GraphNodes } from '../../../const';
import BaseNode from '../../../baseNode';

class Vec2Model extends BaseNode {
  value = makeAutoObservable( new Vector2() );

  constructor( ...props ) {
    super( ...props );
  }

  static type = GraphNodes.Vector2.type;

  getFragmentHeader( uniforms ) {
    uniforms[ this.id ] = { value: this.value };

    console.log( uniforms[ this.id ].value.x, uniforms[ this.id ].value.y );

    return `uniform ${ this.constructor.type } ${ this.id };\n`;
  }
}

export default Vec2Model;
