import * as tt from "telegraf/typings/telegram-types";
import {ParamsMetadata} from "./metadata/ParamsMetadata";
import {ComposerMetadata, ComposerOptions} from "./metadata/ComposerMetadata";
import {WizardStepMetadata} from "./metadata/WizardStepMetadata";
import {Composer as Comp, Context, ContextMessageUpdate} from "telegraf";
import {MetadataArgsStorage} from "./MetadataStorage";
import {TFIMiddleware} from "./TFIMiddleware";

export function UseMiddleware(...middlewares: {new (...args: any[]): TFIMiddleware}[]): ClassDecorator {
    return target => {
        middlewares.forEach(value => {
            MetadataArgsStorage.middlewareMetadata.push({middleware:value, target: target, type: "class"})
        })
    }
}

export function TFController(compose?: (composer: Comp<any>) => void): Function {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        Composer({
            type: "controller",
            data: {
                compose
            }
        })(target, propertyKey, descriptor);
        return descriptor;
    };
}

export function TFScene(scene: string): Function {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {

        Composer({
            type: "scene",
            data: {
                scene
            }
        })(target, propertyKey, descriptor);
        return descriptor;
    };
}

export function TFWizardStep(step: number): Function {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        MetadataArgsStorage.wizardStep.push(new WizardStepMetadata(target, propertyKey, step));
        return descriptor;
    }
}

export function TFWizard(name?: string): Function {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        Composer({
            type: "wizard",
            data: {
                name
            }
        })(target, propertyKey, descriptor);
        return descriptor;
    };
}

export function Composer(options: ComposerOptions): Function {
    return function (target: Function, propertyKey: string, descriptor: PropertyDescriptor) {
        MetadataArgsStorage.composerMetadata.push(new ComposerMetadata(target, options))
        return descriptor;
    };
}

export function Start(): Function {

    return function (target: Object, propertyKey: string, descriptor: PropertyDescriptor) {
        MetadataArgsStorage.handlers.push({
            propertyName: propertyKey,
            target,
            type: "start",
            data: []
        });
        return descriptor;
    }
}

export function Settings(): Function {

    return function (target: Object, propertyKey: string, descriptor: PropertyDescriptor) {
        MetadataArgsStorage.handlers.push({
            propertyName: propertyKey,
            target,
            type: "settings",
            data: []
        });
        return descriptor;
    }
}
export function Entity(entity: string | string[] | RegExp | RegExp[] | Function): Function {

    return function (target: Object, propertyKey: string, descriptor: PropertyDescriptor) {
        MetadataArgsStorage.handlers.push({
            propertyName: propertyKey,
            target,
            type: "entity",
            data: [entity]
        });
        return descriptor;
    }
}

export function Mention(username: string | string[]): Function {

    return function (target: Object, propertyKey: string, descriptor: PropertyDescriptor) {
        MetadataArgsStorage.handlers.push({
            propertyName: propertyKey,
            target,
            type: "mention",
            data: [username]
        });
        return descriptor;
    }
}
export function Phone(phone: string | string[]): Function {

    return function (target: Object, propertyKey: string, descriptor: PropertyDescriptor) {
        MetadataArgsStorage.handlers.push({
            propertyName: propertyKey,
            target,
            type: "phone",
            data: [phone]
        });
        return descriptor;
    }
}
export function Hashtag(hashtag: string | string[]): Function {

    return function (target: Object, propertyKey: string, descriptor: PropertyDescriptor) {
        MetadataArgsStorage.handlers.push({
            propertyName: propertyKey,
            target,
            type: "hashtag",
            data: [hashtag]
        });
        return descriptor;
    }
}
export function Cashtag(cashtag: string | string[]): Function {

    return function (target: Object, propertyKey: string, descriptor: PropertyDescriptor) {
        MetadataArgsStorage.handlers.push({
            propertyName: propertyKey,
            target,
            type: "cashtag",
            data: [cashtag]
        });
        return descriptor;
    }
}

export function Help(): Function {
    return function (target: Object, propertyKey: string, descriptor: PropertyDescriptor) {
        MetadataArgsStorage.handlers.push({
            propertyName: propertyKey,
            target,
            type: "help",
            data: []
        });
        return descriptor;
    }
}

export function On(event: tt.UpdateType | tt.UpdateType[] | tt.MessageSubTypes | tt.MessageSubTypes[]): Function {
    return function (target: Object, propertyKey: string, descriptor: PropertyDescriptor) {

        MetadataArgsStorage.handlers.push({
            propertyName: propertyKey,
            target,
            type: "on",
            data: [event]
        });
        return descriptor;
    }
}

export function Hears(match: string | RegExp): Function {
    return function (target: Object, propertyKey: string, descriptor: PropertyDescriptor) {
        MetadataArgsStorage.handlers.push({
            propertyName: propertyKey,
            target,
            type: "hears",
            data: [match]
        });
        return descriptor;
    }
}

export function Command(command: string): Function {
    return function (target: Object, propertyKey: string, descriptor: PropertyDescriptor) {
        MetadataArgsStorage.handlers.push({
            propertyName: propertyKey,
            target,
            type: "command",
            data: [command]
        });
        return descriptor;
    }
}

export function Enter(): Function {
    return function (target: Object, propertyKey: string, descriptor: PropertyDescriptor) {
        MetadataArgsStorage.handlers.push({
            propertyName: propertyKey,
            target,
            type: "enter",
            data: []
        });
        return descriptor;
    }
}

export function Action(action: string | string[] | RegExp | RegExp[]): Function {
    return function (target: Object, propertyKey: string, descriptor: PropertyDescriptor) {

        MetadataArgsStorage.handlers.push({
            propertyName: propertyKey,
            target,
            type: "action",
            data: [action]
        });
        return descriptor;
    }
}
export function InlineQuery(inlineQuery: string | string[] | RegExp | RegExp[]): Function {
    return function (target: Object, propertyKey: string, descriptor: PropertyDescriptor) {

        MetadataArgsStorage.handlers.push({
            propertyName: propertyKey,
            target,
            type: "inlineQuery",
            data: [inlineQuery]
        });
        return descriptor;
    }
}
export function GameQuery(): Function {
    return function (target: Object, propertyKey: string, descriptor: PropertyDescriptor) {

        MetadataArgsStorage.handlers.push({
            propertyName: propertyKey,
            target,
            type: "gameQuery",
            data: []
        });
        return descriptor;
    }
}

export function Leave(): Function {
    return function (target: Object, propertyKey: string, descriptor: PropertyDescriptor) {
        MetadataArgsStorage.handlers.push({
            propertyName: propertyKey,
            target,
            type: "leave",
            data: []
        });
        return descriptor;
    }
}

export const TFContext = createParamDecorator(ctx => {
    return ctx;
});

export const TFTelegram = createParamDecorator(ctx => {
    return ctx.telegram;
});

export const TFChat = createParamDecorator(ctx => {
    return ctx.chat
});

export const TFMessage = createParamDecorator(ctx => {
    return ctx.message
});


export function createParamDecorator(foo: (ctx: Context | ContextMessageUpdate)=>any){
    return () => (target: any, propertyKey: string, parameterIndex: number) => {
        MetadataArgsStorage.paramMetadata.push(new ParamsMetadata(target, propertyKey, parameterIndex, foo));
    }
}
