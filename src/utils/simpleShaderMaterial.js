import { RawShaderMaterial, DoubleSide } from 'three';

export const SimpleVertexData = (`
precision mediump float;
precision mediump int;

uniform mat4 modelViewMatrix; // optional
uniform mat4 projectionMatrix; // optional

attribute vec3 position;

varying vec3 vPosition;

void main()	{

  vPosition = position;

  gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

}
`).trim();

export const SimpleFragmentData = (`
precision mediump float;
precision mediump int;

varying vec3 vPosition;

void main()	{

  vec4 color = vec4( 1.0, 1.0, 1.0, 1.0 );

  gl_FragColor = color;

}
`).trim();

const simpleShaderMaterial = new RawShaderMaterial({
  uniforms: {},
  vertexShader: SimpleVertexData,
  fragmentShader: SimpleFragmentData,
  side: DoubleSide,
  transparent: true
});

export const getBaseMaterial = () => simpleShaderMaterial.clone();

export default simpleShaderMaterial;

