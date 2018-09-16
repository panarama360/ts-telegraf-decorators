export class CommandMetadata {
    constructor(public target: Function,
                public propertyName: string,
                public command: string) {
    }
}