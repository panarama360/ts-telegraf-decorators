import {Hears, Help, TFChat, TFContext, TFController, TFMessage, TFTelegram, UseMiddleware} from '../../src/'
import {Inject} from "typedi";
import {Aaaa, TestService} from "../services/TestService";
import {Chat, IncomingMessage} from 'telegraf/typings/telegram-types';
import {ContextMessageUpdate, Telegram} from "telegraf";
import {CurrentUser} from "../params";


@TFController()
@UseMiddleware(Aaaa)
export class ControllerTest {


    @Inject()
    service: TestService

    @Hears('test')
    async test(@TFContext()ctx: ContextMessageUpdate, @TFMessage()msg: IncomingMessage, @TFChat()chat: Chat, @TFTelegram() telegram: Telegram) {
        console.log('Hello');
        ctx.reply('Hello');
    }


    @Help()
    async enter(@TFContext()ctx, @CurrentUser() user) {
        ctx.reply('My name is ' + await this.service.getBotName())
    }
}
