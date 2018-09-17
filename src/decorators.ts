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

export function TFController(scene?: string): Function {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        MetadataStorage.addControllerMetadata(new ControllerMetadata(target,propertyKey, scene))
        return descriptor;
    };
}

export function Start():Function {

    return function (target: Function, propertyKey: string, descriptor: PropertyDescriptor) {
        MetadataStorage.addStartMetadata(new StartMetadata(target,propertyKey))
        return descriptor;
    }
}
export function Help():Function {
    return function (target: Function, propertyKey: string, descriptor: PropertyDescriptor) {
        MetadataStorage.addHelpMetadata(new HelpMetadata(target,propertyKey))
        return descriptor;
    }
}
export function On(event:tt.UpdateType | tt.UpdateType[] | tt.MessageSubTypes | tt.MessageSubTypes[]):Function {
    return function (target: Function, propertyKey: string, descriptor: PropertyDescriptor) {
        MetadataStorage.addOnMetadata(new OnMetadata(target,propertyKey,event))
        return descriptor;
    }
}
export function Hears(match:string | RegExp):Function {
    return function (target: Function, propertyKey: string, descriptor: PropertyDescriptor) {
        MetadataStorage.addHearsMetadata(new HearsMetadata(target,propertyKey,match))
        return descriptor;
    }
}

export function Command(command:string):Function {
    return function (target: Function, propertyKey: string, descriptor: PropertyDescriptor) {
        MetadataStorage.addCommandMetadata(new CommandMetadata(target,propertyKey, command))
        return descriptor;
    }
}

export function Enter():Function {
    return function (target: Function, propertyKey: string, descriptor: PropertyDescriptor) {
        MetadataStorage.addEnterMetadata(new EnterMetadata(target,propertyKey))
        return descriptor;
    }
}

export function Leave():Function {
    return function (target: Function, propertyKey: string, descriptor: PropertyDescriptor) {
        MetadataStorage.addLeaveMetadata(new LeaveMetadata(target,propertyKey))
        return descriptor;
    }
}

