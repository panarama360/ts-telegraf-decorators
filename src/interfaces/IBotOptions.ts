import {Container} from "../container";

export interface IBotOptions {
    bot?: any,
    container?: Container,
    token?: string,
    session?: any,
    controllers: Function[]|string[],
    stage?: any
}
