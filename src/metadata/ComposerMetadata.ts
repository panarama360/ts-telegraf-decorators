export interface ComposerOptions {
    type: 'controller' | 'scene' | 'wizard' | 'any',
    data: any;
}
export class ComposerMetadata {
    constructor(public target: Function,
                public options: ComposerOptions) {
    }
}
