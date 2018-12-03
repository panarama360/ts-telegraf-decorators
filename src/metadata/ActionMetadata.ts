import {HearsTriggers} from "telegraf";

export class ActionMetadata {
    constructor(public target: Function,
                public propertyName: string,
                public action: HearsTriggers) {
    }
}