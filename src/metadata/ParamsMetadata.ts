export class ParamsMetadata {
    constructor(public target: Function,
                public propertyName: string,
                public index: number,
                public type: string
    ) {
    }
}