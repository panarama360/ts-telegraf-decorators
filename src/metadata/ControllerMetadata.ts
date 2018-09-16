export class ControllerMetadata {
    constructor(public target: Function,
                public propertyName: string,
                public scene?: string) {
    }
}