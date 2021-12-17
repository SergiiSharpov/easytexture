import { RawShaderMaterial, DoubleSide } from 'three';

const VertexData = (`
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

const FragmentData = (`
precision mediump float;
precision mediump int;

uniform float time;

varying vec3 vPosition;

void main()	{

  vec4 color = vec4( 0.0, 0.0, 0.0, 1.0 );
  color.r += sin( vPosition.x * 10.0 + time ) * 0.5;

  gl_FragColor = color;

}
`).trim();

const FragmentDataNext = (`
precision mediump float;
precision mediump int;

uniform float time;

varying vec3 vPosition;

void main()	{

  vec4 color = vec4( 0.0, 0.5, 1.0, 1.0 );

  gl_FragColor = color;

}
`).trim();

const simpleShaderMaterial = new RawShaderMaterial({
  uniforms: {
    time: { value: 1.0 }
  },
  vertexShader: VertexData,
  fragmentShader: FragmentData,
  side: DoubleSide,
  transparent: true
});


console.log(simpleShaderMaterial);

setTimeout(() => {
  // simpleShaderMaterial.fragmentShader = FragmentDataNext;
  // simpleShaderMaterial.needsUpdate = true;
}, 1000);


export default simpleShaderMaterial;

