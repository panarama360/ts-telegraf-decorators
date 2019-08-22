import {TFController, Start, Command, On, Hears, Help, Enter, TFScene} from '../../src/decorators'
import {TFContext} from "../../src";

@TFScene('game')
export class ControllerTestScene {

    @Enter()
    enter(@TFContext()ctx){
        ctx.reply('Hello Scene game')
    }

    @Hears('ok')
    ok(@TFContext()ctx){
        ctx.reply('OK!!!!')
    }
}
