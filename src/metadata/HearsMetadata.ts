import {HearsTriggers} from "telegraf";

export class HearsMetadata {
    constructor(public target: Function,
                public propertyName: string,
                public match: HearsTriggers) {
    }
}