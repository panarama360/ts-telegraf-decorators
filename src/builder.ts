import MetadataStorage from "./MetadataStorage";
import {IBotOptions} from "./interfaces/IBotOptions";
const Stage = require('telegraf/stage')
const Scene = require('telegraf/scenes/base')
const session = require('telegraf/session')

export function buildFromMetadata(bot: any, options: IBotOptions): any {
    const helpMethods: Function[] = []
    const startMethods: Function[] = []
    const scenes: {[key:string]:any} = {};



    const stage = new Stage()

    if(options.session)
        bot.use(options.session)
    else
        bot.use(session())

    bot.use(stage.middleware())

    MetadataStorage
        .getControllerMetadata().forEach(controller => {
        let controllerInstance = new (controller.target as any)()
        let handler = bot;
        if(controller.scene){
            handler = scenes[controller.scene]||new Scene(controller.scene)
            scenes[controller.scene] = handler;
        }

        MetadataStorage.getHelpMetadata()
            .filter(help => help.target == controller.target.prototype)
            .forEach(value => {
                helpMethods.push((ctx)=>{controllerInstance[value.propertyName](ctx)})
            })

        MetadataStorage.getStartMetadata()
            .filter(start => start.target == controller.target.prototype)
            .forEach(value => {
                startMethods.push((ctx)=>{controllerInstance[value.propertyName](ctx)})
            })

        MetadataStorage.getHearsMetadata()
            .filter(hear => hear.target == controller.target.prototype)
            .forEach(value => {
               handler.hears(value.match, function (ctx) {
                    controllerInstance[value.propertyName](ctx)
                })
            })

        MetadataStorage.getOnMetadata()
            .filter(on => on.target == controller.target.prototype)
            .forEach(value => {
               handler.on(value.event, function (ctx) {
                    controllerInstance[value.propertyName](ctx)
                })
            })

        MetadataStorage.getCommandMetadata()
            .filter(command => command.target == controller.target.prototype)
            .forEach(value => {
               handler.command(value.command, function (ctx) {
                    controllerInstance[value.propertyName](ctx)
                })
            })

        MetadataStorage.getEnterMetadata()
            .filter(command => command.target == controller.target.prototype)
            .forEach(value => {
                handler.enter(function (ctx) {
                    controllerInstance[value.propertyName](ctx)
                })
            })
        MetadataStorage.getLeaveMetadata()
            .filter(command => command.target == controller.target.prototype)
            .forEach(value => {
                handler.leave(function (ctx) {
                    controllerInstance[value.propertyName](ctx)
                })
            })



    })

    bot.help(function (ctx) {
        helpMethods.forEach(method => method(ctx))
    })
    bot.start(function (ctx) {
        startMethods.forEach(method => method(ctx))
    })


    if(Object.keys(scenes).length){
        for(let sc in scenes) {
            stage.register(scenes[sc])
        }
    }

    return bot;
}
