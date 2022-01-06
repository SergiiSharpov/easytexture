// import nodes
import { Vec4Model, Vec4View } from './nodes/input/vec4';
import { FloatModel, FloatView } from './nodes/input/float';
import { Vec3Model, Vec3View } from './nodes/input/vec3';
import { Vec2Model, Vec2View } from './nodes/input/vec2';
import { OutModel, OutView } from './nodes/out/color';
// Import Registry
import { NodeRegistry } from './registry';

// Register nodes
NodeRegistry.registerNode( Vec4Model, Vec4View );
NodeRegistry.registerNode( FloatModel, FloatView );
NodeRegistry.registerNode( Vec3Model, Vec3View );
NodeRegistry.registerNode( Vec2Model, Vec2View );
NodeRegistry.registerNode( OutModel, OutView );

// Export components views
export const FlowComponentsMap = NodeRegistry.getViews();
// Export components models
export const FlowModelMap = NodeRegistry.getConstructors();
