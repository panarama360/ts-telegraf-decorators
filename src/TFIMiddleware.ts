import {Context, ContextMessageUpdate} from "telegraf";

export interface TFIMiddleware {
    use(ctx: ContextMessageUpdate | Context, next: (...args: any[]) => Promise<any>);
}
