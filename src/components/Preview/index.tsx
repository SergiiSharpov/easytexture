import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { observer } from 'mobx-react';
import Tree from 'store/tree';
import Box from './Box';
type IProps = {
  tree: Tree;
}

const Preview = observer( ( { tree }: IProps ) => {
  return (
    <Canvas>
      <ambientLight />
      <pointLight position={ [
        10,
        10,
        10
      ] } />
      <Box position={ [
        0,
        0,
        0
      ] } material={ tree.material } />
      <OrbitControls makeDefault />
    </Canvas>
  );
} );

export default Preview;
