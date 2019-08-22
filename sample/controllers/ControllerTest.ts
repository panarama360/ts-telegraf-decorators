import {
    TFController,
    Start,
    Command,
    On,
    Hears,
    Help,
    TFMessage,
    TFChat, TFTelegram, TFContext, Leave, Enter
} from '../../src/'
import {Inject} from "typedi";
import {TestService} from "../services/TestService";
import {Chat, IncomingMessage} from 'telegraf/typings/telegram-types';
import {Telegram} from "telegraf";


@TFController()
export class ControllerTest {


    @Inject()
    service: TestService

    @Hears('qwe')
    @Command('qwe')
    async testContainer(@TFContext()ctx, @TFMessage()msg:IncomingMessage, @TFChat()chat: Chat, @TFTelegram() telegram: Telegram){
        // ctx.reply(await this.service.getBotName())
        ctx.scene.enter('steps')
        // console.log('Hello');
    }

    @Enter()
    enter(@TFContext()ctx){
        ctx.reply('Hello Scene game')
    }
}
