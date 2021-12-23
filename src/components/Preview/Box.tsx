import React, { useRef } from 'react';
import { observer } from 'mobx-react';
import { Vector3 } from '@react-three/fiber';
import { RawShaderMaterial } from 'three';
type IProps = {
  material: {
    value: RawShaderMaterial;
    set( material: RawShaderMaterial ): void;
  };
  position?: Vector3;
}

const Box = observer( ( { material, ...props } : IProps ) => {
  const ref = useRef();

  return (
    <mesh
      { ...props }
      ref={ ref }
      scale={ 1 }
      material={ material.value }
    >
      <boxGeometry args={ [
        2,
        2,
        2
      ] } />
    </mesh>
  );
} );

export default Box;
