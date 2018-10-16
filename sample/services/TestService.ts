import {Service} from "typedi";

@Service()
export class TestService {

    async getBotName(): Promise<string>{
        return 'My Bot'
    }
}