import React, { useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'

const Box = (props) => {
  // This reference gives us direct access to the THREE.Mesh object
  const ref = useRef()

  // Return the view, these are regular Threejs elements expressed in JSX
  return (
    <mesh
      {...props}
      ref={ref}
      scale={1}
      // material={simpleShaderMaterial}
    >
      <boxGeometry args={[2, 2, 2]} />
      {/* <meshStandardMaterial color='orange' /> */}
    </mesh>
  )
}

const Preview = ({tree}) => {

  return (
    <Canvas>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <Box position={[0, 0, 0]} material={tree.material} />
      <OrbitControls makeDefault />
    </Canvas>
  )
}

export default Preview;