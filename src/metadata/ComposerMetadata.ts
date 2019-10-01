import {TFIMiddleware} from "../TFIMiddleware";

export interface ComposerOptions {
    type: 'controller' | 'scene' | 'wizard' | 'any',
    data: any;
    middlewares?: {new (...args: any[]) : TFIMiddleware}[]
}
export class ComposerMetadata {
    constructor(public target: Function,
                public options: ComposerOptions) {
    }
}
