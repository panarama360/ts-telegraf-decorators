import Telegraf from 'telegraf'
import * as path from "path";
import {buildFromMetadata} from "./builder";
import {IBotOptions} from "./interfaces/IBotOptions";
const glob  = require("glob");

export * from './decorators'
export * from './interfaces/IBotOptions'
export * from './metadata'

export function buildBot(options: IBotOptions) {
    let bot = options.bot || new Telegraf(options.token)

    glob.sync(path.normalize(options.pathControllers)).filter(file =>
        file.substring(file.length - 5, file.length) !== ".d.ts"
    ).forEach(dir=> require(dir) )


    return buildFromMetadata(bot, options);
}

