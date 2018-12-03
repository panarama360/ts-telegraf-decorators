import 'reflect-metadata'
import {buildBot} from "../src";
//import {ControllerTest} from "./controllers/ControllerTest";
import {Container} from "typedi";

const bot = buildBot({
    token: '<TOKEN>',
    container: Container,
    // bot: bot                 bot instance
    // session: session()       custom session
    controllers: [__dirname+'/controllers/**.ts'],
    // or controllers: [ControllerTest],
}).startPolling()

