import * as tt from "telegraf/typings/telegram-types";

export class OnMetadata {
    constructor(public target: Function,
                public propertyName: string,
                public event: tt.UpdateType | tt.UpdateType[] | tt.MessageSubTypes | tt.MessageSubTypes[]) {
    }
}