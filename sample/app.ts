import {buildBot} from "../src";


buildBot({
    token: process.env.BOT_TOKEN,
    // bot: bot                 bot instance
    // session: session()       custom session
    pathControllers: __dirname+'/controllers/**.js',
}).startPolling()

