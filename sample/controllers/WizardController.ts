import {Command, Hears, Leave, TFContext, TFWizard, TFWizardStep} from "../../src";

@TFWizard('steps')
export class WizardController{


    @TFWizardStep(1)
    hello(@TFContext() ctx){
        console.log('step 1');
        return ctx.wizard.next();
    }

    @TFWizardStep(2)
    hello2(@TFContext() ctx){
        console.log('step 2');
        return ctx.wizard.next();
    }

    @TFWizardStep(3)
    @Hears('hello')
    hello3(@TFContext() ctx){
        console.log('step 3');
        return ctx.wizard.next();
    }

    @TFWizardStep(3)
    @Command('hello')
    hello4(@TFContext() ctx){
        console.log('step 3');
        return ctx.wizard.next();
    }

    @TFWizardStep(3)
    @Command('hello')
    @Command('test')
    @Command('test2')
    hello5(@TFContext() ctx){
        console.log('step 3')
        return ctx.scene.leave();
    }

    @Command('exit')
    exit(@TFContext() ctx){
        return ctx.scene.leave();
    }

    @Leave()
    leave(@TFContext() ctx){
        console.log('Leave');
    }
}
