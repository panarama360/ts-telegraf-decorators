import {TFController, Start, Command, On, Hears, Help} from '../../src/'

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
}