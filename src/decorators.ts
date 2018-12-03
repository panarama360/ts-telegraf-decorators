import MetadataStorage from "./MetadataStorage";
import {StartMetadata} from "./metadata/StartMetadata";
import {CommandMetadata} from "./metadata/CommandMetadata";
import {HelpMetadata} from "./metadata/HelpMetadata";
import {OnMetadata} from "./metadata/OnMetadata";
import {HearsMetadata} from "./metadata/HearsMetadata";
import * as tt from "telegraf/typings/telegram-types";
import {ControllerMetadata} from "./metadata/ControllerMetadata";
import {LeaveMetadata} from "./metadata/LeaveMetadata";
import {EnterMetadata} from "./metadata/EnterMetadata";
import {ParamsMetadata} from "./metadata/ParamsMetadata";
import {ActionMetadata} from "./metadata";

export function TFController(scene?: string): Function {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        MetadataStorage.controllerMetadata.push(new ControllerMetadata(target,propertyKey, scene))
        return descriptor;
    };
}

export function Start():Function {

    return function (target: Function, propertyKey: string, descriptor: PropertyDescriptor) {
        MetadataStorage.startMetadata.push(new StartMetadata(target,propertyKey))
        return descriptor;
    }
}
export function Help():Function {
    return function (target: Function, propertyKey: string, descriptor: PropertyDescriptor) {
        MetadataStorage.helpMetadata.push(new HelpMetadata(target,propertyKey))
        return descriptor;
    }
}
export function On(event:tt.UpdateType | tt.UpdateType[] | tt.MessageSubTypes | tt.MessageSubTypes[]):Function {
    return function (target: Function, propertyKey: string, descriptor: PropertyDescriptor) {
        MetadataStorage.onMetadata.push(new OnMetadata(target,propertyKey,event))
        return descriptor;
    }
}
export function Hears(match:string | RegExp):Function {
    return function (target: Function, propertyKey: string, descriptor: PropertyDescriptor) {
        MetadataStorage.hearsMetadata.push(new HearsMetadata(target,propertyKey,match))
        return descriptor;
    }
}

export function Command(command:string):Function {
    return function (target: Function, propertyKey: string, descriptor: PropertyDescriptor) {
        MetadataStorage.commandMetadata.push(new CommandMetadata(target,propertyKey, command))
        return descriptor;
    }
}

export function Enter():Function {
    return function (target: Function, propertyKey: string, descriptor: PropertyDescriptor) {
        MetadataStorage.enterMetadata.push(new EnterMetadata(target,propertyKey))
        return descriptor;
    }
}

export function Action(action:string | RegExp):Function {
    return function (target: Function, propertyKey: string, descriptor: PropertyDescriptor) {
        MetadataStorage.actionMetadata.push(new ActionMetadata(target,propertyKey, action))
        return descriptor;
    }
}

export function Leave():Function {
    return function (target: Function, propertyKey: string, descriptor: PropertyDescriptor) {
        MetadataStorage.leaveMetadata.push(new LeaveMetadata(target,propertyKey))
        return descriptor;
    }
}

export function TFContext():Function {
    return function (target: Function, propertyKey: string, parameterIndex: number) {
        MetadataStorage.paramMetadata.push(new ParamsMetadata(target, propertyKey, parameterIndex, 'ctx'))
    }
}
export function TFTelegram():Function {
    return function (target: Function, propertyKey: string, parameterIndex: number) {
        MetadataStorage.paramMetadata.push(new ParamsMetadata(target, propertyKey, parameterIndex, 'telegram'))
    }
}
export function TFChat():Function {
    return function (target: Function, propertyKey: string, parameterIndex: number) {
        MetadataStorage.paramMetadata.push(new ParamsMetadata(target, propertyKey, parameterIndex, 'chat'))
    }
}
export function TFMessage():Function {
    return function (target: Function, propertyKey: string, parameterIndex: number) {
        MetadataStorage.paramMetadata.push(new ParamsMetadata(target, propertyKey, parameterIndex, 'message'))
    }
}

