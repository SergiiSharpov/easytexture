export class CustomSet extends Set {
  get( idx: number ) {
    if( typeof idx !== 'number' ) {
      throw new TypeError( `Argument idx must be a Number. Got [${ idx }]` );
    }

    let i = 0;
    for( let iter = this.keys(), curs = iter.next(); !curs.done; curs = iter.next(), i++ ) {
      if( idx === i ) {
        return curs.value;
      }
    }

    throw new RangeError( `Index [${ idx }] is out of range [0-${ i - 1 }]` );
  }
}
