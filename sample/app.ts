import 'reflect-metadata'
import {buildBot, MetadataArgsStorage} from "../src";
import {Container} from "typedi";

const bot = buildBot({
    token: "<token>",
    container: Container,
    // bot: bot                 bot instance
    // session: session()       custom session
    // stage: new Stage()       your Stage
    controllers: [__dirname+'/controllers/**.ts'],
    // or controllers: [ControllerTest],
}).startPolling()
