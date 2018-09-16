import {TFController, Start, Command, On, Hears, Help} from '../../src/decorators'

@TFController()
export class ControllerTest {


    al: number = 0


    constructor(){
        console.log('constr')
    }

    @Start()
    start1(ctx){
        console.log('Hello1 '+this.al)
        this.al ++;
    }

    @Start()
    start2(ctx){
        console.log('Hello2')
    }

    @Command('test')
    test(ctx){
        console.log('Test!')
        console.log(ctx)
        console.log(ctx.scene)
        ctx.scene.enter('game')
    }

    @Command('testing')
    testing(ctx){
        console.log('testing')
    }

    @Hears('hears')
    hears(ctx){
        console.log('hears')
    }

    @Hears('hears1')
    hears1(ctx){
        console.log(this)
        console.log('hears1 '+this.al)
        this.al ++;
    }


    @On('sticker')
    sticker(ctx){
        console.log('sticker', this.al)
        this.al ++;
    }

    @Help()
    help(ctx){
        console.log('Help')
    }

    @Help()
    help1(ctx){
        console.log('Help1')
    }
}