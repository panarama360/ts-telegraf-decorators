import {TFController, Start, Command, On, Hears, Help, Enter} from '../../src/decorators'
import {TFContext} from "../../src";

@TFController('game')
export class ControllerTestScene {

    @Enter()
    enter(@TFContext()ctx){
        ctx.reply('Hello Scene game')
    }

    @Hears('ok')
    ok(ctx){
        ctx.reply('OK!!!!')
    }
}