import {TFController, Start, Command, On, Hears, Help} from '../../src/decorators'

@TFController('game')
export class ControllerTestScene {


    @Hears('ok')
    ok(ctx){
        console.log('OK!!!!')
    }
}