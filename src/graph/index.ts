// import nodes
import { Vec4Model, Vec4View } from './nodes/input/vec4';
import { FloatModel, FloatView } from './nodes/input/float';
import { OutModel, OutView } from './nodes/out/color';
import { Vec3Model, Vec3View } from './nodes/input/vec3';
// Import Registry
import { NodeRegistry } from './registry';

// Register nodes
NodeRegistry.registerNode( Vec4Model, Vec4View );
NodeRegistry.registerNode( FloatModel, FloatView );
NodeRegistry.registerNode( OutModel, OutView );
NodeRegistry.registerNode( Vec3Model, Vec3View );

// Export components views
export const FlowComponentsMap = NodeRegistry.getViews();
// Export components models
export const FlowModelMap = NodeRegistry.getConstructors();
