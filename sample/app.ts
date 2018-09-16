import {build} from "../src";


build(process.env.BOT_TOKEN, __dirname+'/controllers/**.js')
    .startPolling()


