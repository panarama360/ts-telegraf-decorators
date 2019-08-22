
export interface HandlerMetadata {
    type: 'start' | 'command' | 'help' | 'hears' | 'on' | 'leave' | 'enter' | 'action' ,
    target: Function,
    propertyName: string,
    data: any
}
