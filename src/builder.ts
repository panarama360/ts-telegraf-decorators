import MetadataStorage from "./MetadataStorage";
import {IBotOptions} from "./interfaces/IBotOptions";
import {getFromContainer} from "./container";
import Telegraf from "telegraf";
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
        .controllerMetadata.forEach(controller => {
        let controllerInstance = getFromContainer(controller.target)
        let handler = bot;
        if(controller.scene){
            handler = scenes[controller.scene]||new Scene(controller.scene)
            scenes[controller.scene] = handler;
        }

        MetadataStorage.helpMetadata
            .filter(help => help.target == controller.target.prototype)
            .forEach(value => {
                helpMethods.push((ctx)=>{controllerInstance[value.propertyName](...getInjectParams(ctx, controller.target, value.propertyName))})
            })

        MetadataStorage.startMetadata
            .filter(start => start.target == controller.target.prototype)
            .forEach(value => {
                startMethods.push((ctx)=>{controllerInstance[value.propertyName](...getInjectParams(ctx, controller.target, value.propertyName))})
            })

        MetadataStorage.hearsMetadata
            .filter(hear => hear.target == controller.target.prototype)
            .forEach(value => {
               handler.hears(value.match, function (ctx) {

                    controllerInstance[value.propertyName](...getInjectParams(ctx, controller.target, value.propertyName))
                })
            })

        MetadataStorage.onMetadata
            .filter(on => on.target == controller.target.prototype)
            .forEach(value => {
               handler.on(value.event, function (ctx) {
                    controllerInstance[value.propertyName](...getInjectParams(ctx, controller.target, value.propertyName))
                })
            })

        MetadataStorage.commandMetadata
            .filter(command => command.target == controller.target.prototype)
            .forEach(value => {
               handler.command(value.command, function (ctx) {
                    controllerInstance[value.propertyName](...getInjectParams(ctx, controller.target, value.propertyName))
                })
            })

        MetadataStorage.enterMetadata
            .filter(command => command.target == controller.target.prototype)
            .forEach(value => {
                handler.enter(function (ctx) {
                    controllerInstance[value.propertyName](...getInjectParams(ctx, controller.target, value.propertyName))
                })
            })
        MetadataStorage.leaveMetadata
            .filter(command => command.target == controller.target.prototype)
            .forEach(value => {
                handler.leave(function (ctx) {
                    controllerInstance[value.propertyName](...getInjectParams(ctx, controller.target, value.propertyName))
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


function getInjectParams(ctx: any, target: Function, methodName: string): any[]{

    return MetadataStorage
        .paramMetadata
        .filter(value => value.target == target.prototype && methodName === value.propertyName)
        .sort((a, b) => a.index-b.index)
        .map(value => {
            if(value.type === 'ctx')
                return ctx;
            return ctx[value.type];
        })

}