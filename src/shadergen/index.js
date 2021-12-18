
// class IDCounter {
//   constructor() {
//     this.id = 0;
//   }

//   get next() {
//     return this.id++;
//   }

//   reset() {
//     this.id = 0;
//   }
// }

Set.prototype.get = function(idx){
  if(typeof idx !== 'number') throw new TypeError(`Argument idx must be a Number. Got [${idx}]`);

  let i = 0;
  for( let iter = this.keys(), curs = iter.next(); !curs.done; curs = iter.next(), i++ )
    if(idx === i) return curs.value;

  throw new RangeError(`Index [${idx}] is out of range [0-${i-1}]`);
}



const FragmentHeaderShader = (`
precision mediump float;
precision mediump int;
`).trim();

const FragmentBeforeMainShader = (`
void main()	{
`).trim();

const FragmentAfterMainShader = (`
}
`).trim();



class ShaderGraph {
  inputNodes = {};
  constructor() {
    // this.inputNodes = {};
    this.nodes = {};
    this.dependencies = [];
    this.outNode = null;

    this._processed = {};
    this.ordered = new Set();
  }

  setOutNodeFromTree(tree) {
    for (let node of tree) {
      if (node.type === 'out') {
        this.outNode = node;
        break;
      }
    }
  }

  proessNode(node) {
    if (!node.type) {
      this.dependencies.push(node);
      return false;
    }

    switch (node.type) {
      case 'vec3':
        this.inputNodes[node.data.label] = node;
      break;
    }

    this.nodes[node.data.label] = node;

    this._processed[node.id] = {
      origin: node,
      dependencies: new Set()
    };
  }

  getNodeById(id) {
    for (let node of Object.values(this.nodes)) {
      if (node.id === id) {
        return node;
      }
    }

    return null;
  }

  markDependent() {
    for (let dep of this.dependencies) {
      if (this._processed[dep.target]) {
        this._processed[dep.target].dependencies.add(dep.source);
      }
    }
  }

  reorder(baseNode) {
    for (let dependKey of this._processed[baseNode.id].dependencies) {
      this.reorder(this.getNodeById(dependKey));
    }

    this.ordered.add(baseNode);
  }

  compileTree(tree) {
    this.setOutNodeFromTree(tree);
    if (!this.outNode) {
      console.error("Graph doesn't has an output node");
    }

    // Get input nodes + get nodes flat object with names
    for (let node of tree) {
      this.proessNode(node);
    }

    console.log(this);
    this.markDependent();
    this.reorder(this.outNode);
    // this._processed = {};
  }

  getNodeNameById(id) {
    for (let node of Object.values(this.nodes)) {
      if (node.id === id) {
        return node.data.label;
      }
    }

    return null;
  }

  getNodeDepName(node, depIndex) {
    return this.getNodeNameById(this._processed[node.id].dependencies.get(depIndex));
  }

  getShaderInfo() {
    let info = {
      uniforms: {},
      fragmentShader: ''
    };

    let uniformBlock = "";
    let mainBlock = "";

    for (let node of this.ordered) {
      switch (node.type) {
        case 'float':
        case 'vec2':
        case 'vec3':
        case 'vec4':
          uniformBlock += `uniform ${node.type} ${node.data.label};\n`;
          info.uniforms[node.data.label] = {value: node.data.value}
        break;

        case 'out':
          let outVar = this.getNodeDepName(node, 0);
          mainBlock += `gl_FragColor = vec4(${outVar}, 1.0);`;
        break;

        case 'sum':
          let a = this.getNodeDepName(node, 0);
          let b = this.getNodeDepName(node, 1);

          mainBlock += `vec3 ${node.data.label} = ${a} + ${b};\n`;
        break;

        default:

        break;
      }
    }

    info.fragmentShader = [
      FragmentHeaderShader,
      uniformBlock,
      FragmentBeforeMainShader,
      mainBlock,
      FragmentAfterMainShader
    ].join('\n');

    return info;
  }
};

const graph = new ShaderGraph();

const compile = (tree, material) => {
  graph.compileTree(tree);
  let shaderInfo = graph.getShaderInfo();

  material.uniforms = shaderInfo.uniforms;
  material.fragmentShader = shaderInfo.fragmentShader;
}

export default compile;