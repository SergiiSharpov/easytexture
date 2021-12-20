import React, { useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { observer } from 'mobx-react'

const Box = observer(({material, ...props}) => {
  // This reference gives us direct access to the THREE.Mesh object
  const ref = useRef()

  // Return the view, these are regular Threejs elements expressed in JSX
  return (
    <mesh
      {...props}
      ref={ref}
      scale={1}
      material={material.value}
    >
      <boxGeometry args={[2, 2, 2]} />
    </mesh>
  )
});

const Preview = observer(({tree}) => {

  return (
    <Canvas>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <Box position={[0, 0, 0]} material={tree.material} />
      <OrbitControls makeDefault />
    </Canvas>
  )
});

export default Preview;