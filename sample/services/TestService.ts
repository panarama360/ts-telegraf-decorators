import {Service} from "typedi";
import {TFIMiddleware} from "../../src/TFIMiddleware";
import {Context, ContextMessageUpdate} from "telegraf";

@Service()
export class TestService {

    async getBotName(): Promise<string>{
        return 'My Bot'
    }
}

export class Aaaa implements TFIMiddleware{
    async use(ctx: Context, next: (...args: any[]) => Promise<any>) {
        console.log('pre');
        await next();
        console.log('post');
    }
}
