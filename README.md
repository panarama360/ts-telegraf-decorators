# ts-telegraf-decorators
ts-telegraf-decorators

This is a simple library that will allow you to use decorators and typescript. Based on [telegraf](https://github.com/telegraf/telegraf/)

### Installation

```
$ npm install ts-telegraf-decorators 
```

### Base Examples

**Create controller**
```typescript
import {Start, Command, TFController} from 'ts-telegraf-decorators'

@TFController()
export class ControllerTest {

    @Start()
    start(@TFContext() ctx){
        ctx.reply('Hello start')
    }
    
    @Command('ping')
    ping(@TFContext() ctx){
        ctx.reply('pong')
    }
}
```

**Create app.ts**
```typescript
import {buildBot} from "ts-telegraf-decorators";
//import {ControllerTest} from "./controllers/ControllerTest";


buildBot({
    token: process.env.BOT_TOKEN,
    // bot: bot                 bot instance
    // session: session()       custom session
    controllers: [__dirname+'/controllers/**.js'],
    // or controllers: [ControllerTest],
}).startPolling()



```



### If Use Container

**Create service**
```typescript
import {Service} from "typedi";

@Service()
export class TestService {

    async getBotName(): Promise<string>{
        return 'My Bot'
    }
}
```

**Use Container**
```typescript
import 'reflect-metadata'
import {buildBot} from "ts-telegraf-decorators";
//import {ControllerTest} from "./controllers/ControllerTest";
import {Container} from "typedi";

buildBot({
    token: process.env.BOT_TOKEN,
    container: Container,
    // bot: bot                 bot instance
    // session: session()       custom session
    controllers: [__dirname+'/controllers/**.js'],
    // or controllers: [ControllerTest],
}).startPolling()

```

**Create controller**
```typescript
@TFController()
export class ControllerTest {

    @Inject()
    service: TestService
    
    @Start()
    start(@TFContext() ctx){
        ctx.reply('Hello start')
    }
    
    @Command('ping')
    async ping(@TFContext() ctx){
        ctx.reply('pong '+ await this.service.getBotName())
    }
}
````

**Create Wizard**
```typescript
@TFWizard('steps')
export class WizardController {


    @TFWizardStep(1)
    hello(@TFContext() ctx) {
        console.log('step 1');
        return ctx.wizard.next();
    }

    @TFWizardStep(2)
    hello2(@TFContext() ctx) {
        console.log('step 2');
        return ctx.wizard.next();
    }

    @TFWizardStep(3)
    @Hears('hello')
    hello3(@TFContext() ctx) {
        console.log('step 3');
        return ctx.wizard.next();
    }

    @TFWizardStep(3)
    @Command('test')
    hello4(@TFContext() ctx) {
        console.log('step 3');
        return ctx.wizard.next();
    }

    @TFWizardStep(3)
    @Command('hello')
    hello5(@TFContext() ctx) {
        console.log('step 3')
        return ctx.scene.leave();
    }

    @Command('exit')
    exit(@TFContext() ctx) {
        return ctx.scene.leave();
    }

    @Leave()
    leave(@TFContext() ctx) {
        console.log('Leave');
    }
}
````

**Create Custom Inject Parameters**
```typescript
export const CurrentUser = createParamDecorator(ctx => {
    return (ctx as any).user;
})

```
**Use Parameters**
```typescript
@TFController()
class AnyController {
      @Help()
      async enter(@TFContext()ctx, @CurrentUser() user) {
          ctx.reply('My name is ' + await this.service.getBotName())
      }
}
```
