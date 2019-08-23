import {createParamDecorator} from "../src";

export const CurrentUser = createParamDecorator(ctx => {
    return (ctx as any).user;
})
