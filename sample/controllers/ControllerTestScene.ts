import {TFController, Start, Command, On, Hears, Help, Enter} from '../../src/decorators'

@TFController('game')
export class ControllerTestScene {

    @Enter()
    enter(ctx){
        ctx.reply('Hello Scene game')
    }

    @Hears('ok')
    ok(ctx){
        ctx.reply('OK!!!!')
    }
}