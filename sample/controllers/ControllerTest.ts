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

//Controller Example
@TFController()
export class ControllerTest {

    @Start()
    start1(ctx){
        ctx.reply('Hello start1')
    }

    @Start()
    start2(ctx){
        ctx.reply('Hello start2')
    }

    @Command('command1')
    command1(ctx){
        ctx.reply('Hello command1')
    }


    @Hears('hears')
    hears(ctx){
        ctx.reply('Hello hears')
    }

    @Hears(/!.*/)
    hearsRegex(ctx){
        ctx.reply('Hello hears regex')
    }


    @On('sticker')
    sticker(ctx){
        ctx.reply('WOOOW')
    }

    @Help()
    help1(ctx){
        ctx.reply('Hello help1')
    }

    @Help()
    help2(ctx){
        ctx.reply('Hello help2')
    }

    @Command('entergame')
    enterGame(ctx){
        ctx.scene.enter('game')
    }

    @Inject()
    service: TestService

    @Hears('container')
    async testContainer(@TFContext()ctx: ContextMessageUpdate, @TFMessage()msg:IncomingMessage, @TFChat()chat: Chat, @TFTelegram() telegram: Telegram){
        console.log(msg.text)
        console.log(chat.id)
        console.log(telegram)
        ctx.reply(await this.service.getBotName())
    }

}