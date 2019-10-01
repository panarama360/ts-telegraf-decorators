
export interface MiddlewareMetadata {
    type: 'class' | 'method' ,
    target: Function,
    middleware: Function
}
