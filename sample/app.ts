import {buildBot} from "../src";
//import {ControllerTest} from "./controllers/ControllerTest";


buildBot({
    token: process.env.BOT_TOKEN,
    // bot: bot                 bot instance
    // session: session()       custom session
    controllers: [__dirname+'/controllers/**.js'],
    // or controllers: [ControllerTest],
}).startPolling()

