
export interface HandlerMetadata {
    type: 'start' | 'command' | 'help' | 'hears' | 'on' | 'leave' | 'enter' | 'action' ,
    target: Object,
    propertyName: string,
    data: any
}
