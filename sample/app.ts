import 'reflect-metadata'
import {buildBot} from "../src";
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

