import 'reflect-metadata'
import {buildBot} from "../src";
import {Container} from "typedi";

const bot = buildBot({
    token: "705353703:AAHfcsPcOGSyraqVe-u123s5967Lv-X2Rl0",
    container: Container,
    // bot: bot                 bot instance
    // session: session()       custom session
    // stage: new Stage()       your Stage
    controllers: [__dirname+'/controllers/**.ts'],
    // or controllers: [ControllerTest],
}).startPolling()

