import 'reflect-metadata'
import {buildBot} from "../src";
import {Container} from "typedi";

const bot = buildBot({
    token: process.env.BOT_TOKEN,
    container: Container,
    // bot: bot                 bot instance
    // session: session()       custom session
    // stage: new Stage()       your Stage
    controllers: [__dirname+'/controllers/**.ts'],
    // or controllers: [ControllerTest],
}).startPolling()

