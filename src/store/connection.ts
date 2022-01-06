import { makeObservable, observable, computed } from 'mobx';

export type _IConnectionProps = {
  target : string | null;
  targetHandle: string | null;
  source : string;
  sourceHandle: string;
}
class Connection {
  isConnection = true;

  id = '';

  target: _IConnectionProps['target'];

  targetHandle: _IConnectionProps['targetHandle'];

  source: _IConnectionProps['source'];

  sourceHandle: _IConnectionProps['sourceHandle'];

  constructor( { target = null, targetHandle = null, source = '', sourceHandle = '' }: _IConnectionProps ) {
    makeObservable( this, {
      source: observable,
      sourceHandle: observable,
      target: observable,
      targetHandle: observable,
      id: observable,
      flat: computed
    } );

    this.target = target;
    this.targetHandle = targetHandle;
    this.source = source;
    this.sourceHandle = sourceHandle;
  }

  equals( props : _IConnectionProps ) {
    return (
      props.target === this.target &&
      props.targetHandle === this.targetHandle &&
      props.source === this.source &&
      props.sourceHandle === this.sourceHandle
    );
  }

  get flat() {
    return {
      id: this.id,
      source: this.source,
      sourceHandle: this.sourceHandle,
      target: this.target,
      targetHandle: this.targetHandle,
      animated: false
    };
  }
}

export default Connection;
