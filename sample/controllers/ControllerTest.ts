import {Hears, Help, TFChat, TFContext, TFController, TFMessage, TFTelegram} from '../../src/'
import {Inject} from "typedi";
import {TestService} from "../services/TestService";
import {Chat, IncomingMessage} from 'telegraf/typings/telegram-types';
import {Telegram} from "telegraf";
import {CurrentUser} from "../params";


@TFController()
export class ControllerTest {


    @Inject()
    service: TestService

    @Hears('test')
    async test(@TFContext()ctx, @TFMessage()msg: IncomingMessage, @TFChat()chat: Chat, @TFTelegram() telegram: Telegram) {
        // ctx.reply(await this.service.getBotName())
        ctx.scene.enter('steps')
        // console.log('Hello');
    }

    @Help()
    async enter(@TFContext()ctx, @CurrentUser() user) {
        ctx.reply('My name is ' + await this.service.getBotName())
    }
}
