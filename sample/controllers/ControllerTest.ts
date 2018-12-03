import {
    TFController,
    Start,
    Command,
    On,
    Hears,
    Help,
    TFMessage,
    TFChat, TFTelegram, TFContext
} from '../../src/'
import {Inject} from "typedi";
import {TestService} from "../services/TestService";
import {Chat, IncomingMessage} from 'telegraf/typings/telegram-types';
import {Context, ContextMessageUpdate, Telegram} from "telegraf";

@TFController()
export class ControllerTest {


    @Inject()
    service: TestService

    @Hears('container')
    async testContainer(@TFContext()ctx: ContextMessageUpdate, @TFMessage()msg:IncomingMessage, @TFChat()chat: Chat, @TFTelegram() telegram: Telegram){
        ctx.reply(await this.service.getBotName())
    }

}