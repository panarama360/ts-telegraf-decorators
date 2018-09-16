import Telegraf from 'telegraf'
import * as path from "path";
import {buildFromMetadata} from "./builder";
const glob  = require("glob");
export function build(token: string,
                      pathControllers: string) {
    const bot = new Telegraf(token)
    console.log(glob.sync(path.normalize(pathControllers)))
    glob.sync(path.normalize(pathControllers)).forEach(dir=>{
        require(dir)
    })
    buildFromMetadata(bot)

    return bot;
}
