import Connection from 'src/store/tree/connection';
import { FloatModel } from './input/float';
import { Vec4Model } from './input/vec4';
import { OutModel } from './out/color';

export type modelConstructor = typeof FloatModel | typeof Vec4Model | typeof OutModel;
export type model = FloatModel | Vec4Model | OutModel;
export type node = model | Connection;
