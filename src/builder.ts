import MetadataStorage from "./MetadataStorage";
import {IBotOptions} from "./interfaces/IBotOptions";
import {getFromContainer} from "./container";
import {Composer} from "telegraf";


import {ComposerMetadata} from "./metadata/ComposerMetadata";
import {WizardMetadata} from "./metadata/WizardMetadata";

const WizardScene = require('telegraf/scenes/wizard')
const Stage = require('telegraf/stage')
const Scene = require('telegraf/scenes/base')
const session = require('telegraf/session')

export function buildFromMetadata(bot: any, options: IBotOptions): any {
    const stage = options.stage || new Stage();

    bot.use(options.session ? options.session : session())

    bot.use(stage.middleware())

    MetadataStorage.composerMetadata
        .forEach(controller => {
            let controllerInstance = getFromContainer(controller.target)
            if (controller.options.type == "controller")
                buildController(bot, controller, controllerInstance);
            else if (controller.options.type == "scene")
                buildScene(stage, controller, controllerInstance);
            else if (controller.options.type == "wizard")
                buildWizard(bot, stage, controller, controllerInstance)
        });

    return bot;
}

function buildScene(stage: any, controllerScene: ComposerMetadata, controllerInstance: any) {
    const scene = new Scene(controllerScene.options.data.scene);
    MetadataStorage
        .handlers
        .filter(value => controllerScene.target.prototype == value.target)
        .forEach(handler => {
            scene[handler.type](...[...handler.data, (ctx) => {
                controllerInstance[handler.propertyName](...getInjectParams(ctx, controllerScene.target, handler.propertyName));
            }])
        });
    stage.register(scene);
}

function buildController(bot: any, controller: ComposerMetadata, controllerInstance: any) {
    // @ts-ignore
    const composer = new Composer();
    MetadataStorage
        .handlers
        .filter(value => controller.target.prototype == value.target && value.type != "enter" && value.type != 'leave')
        .forEach(handler => {
            composer[handler.type](...[...handler.data, (ctx) => {
                controllerInstance[handler.propertyName](...getInjectParams(ctx, controller.target, handler.propertyName));
            }])
        });
    bot.use(controller.options.data.compose ? controller.options.data.compose(composer) : composer);
}

function buildWizard(bot: any, stage: any, wizard: ComposerMetadata, controllerInstance: any) {
    const group = MetadataStorage
        .wizardStep
        .sort((a, b) => a.step - b.step)
        .reduce(function (r, a) {
            r[a.step] = r[a.step] || [];
            r[a.step].push(a);
            return r;
        }, Object.create(null));
    const steps = Object.values(group).map((stepsMetadata: WizardMetadata[], index) => {
        const composer = new Composer();
        let method;
        stepsMetadata.forEach(stepMethod => {
            const handlers = MetadataStorage.handlers.filter(value => value.target == wizard.target.prototype && value.propertyName == stepMethod.propertyName);
            if (handlers.length) {

                handlers.forEach(handler => {
                    composer[handler.type](...[...handler.data, (ctx) => {
                        return controllerInstance[handler.propertyName](...getInjectParams(ctx, wizard.target, handler.propertyName));
                    }])
                })
            } else {
                method = (ctx) => {
                    return controllerInstance[stepMethod.propertyName](...getInjectParams(ctx, wizard.target, stepMethod.propertyName));
                }
            }
        })
        return method || composer;
    })


    const wizardInstance = new WizardScene(wizard.options.data.name, ...steps);
    const handlers = MetadataStorage.handlers.filter(value => wizard.target.prototype == value.target && !MetadataStorage.wizardStep.find(value1 => value1.propertyName == value.propertyName))
    handlers.forEach(handler => {
        wizardInstance[handler.type](...[...handler.data, (ctx) => {
            return controllerInstance[handler.propertyName](...getInjectParams(ctx, wizard.target, handler.propertyName));
        }])
    });
    stage.register(wizardInstance);
}


function getInjectParams(ctx: any, target: Function, methodName: string): any[] {

    return MetadataStorage
        .paramMetadata
        .filter(value => value.target == target.prototype && methodName === value.propertyName)
        .sort((a, b) => a.index - b.index)
        .map(value => {
            if (value.type === 'ctx')
                return ctx;
            return ctx[value.type];
        })

}
