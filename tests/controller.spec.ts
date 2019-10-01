import {
    Action,
    buildBot,
    Command,
    Hears,
    Help,
    MetadataArgsStorage,
    On,
    Start,
    TFContext,
    TFController,
    TFMessage
} from "../src";
import {Container} from "typedi";
import Telegraf from "telegraf";

const BaseTextMessage = {
    chat: { id: 1 },
    text: 'foo'
}

const UpdateTypes = [
    { type: 'shipping_query', prop: 'shippingQuery', update: { shipping_query: {} } },
    { type: 'message', prop: 'message', update: { message: BaseTextMessage } },
    { type: 'edited_message', prop: 'editedMessage', update: { edited_message: BaseTextMessage } },
    { type: 'callback_query', prop: 'callbackQuery', update: { callback_query: { message: BaseTextMessage } } },
    { type: 'inline_query', prop: 'inlineQuery', update: { inline_query: {} } },
    { type: 'channel_post', prop: 'channelPost', update: { channel_post: BaseTextMessage } },
    { type: 'pre_checkout_query', prop: 'preCheckoutQuery', update: { pre_checkout_query: {} } },
    { type: 'edited_channel_post', prop: 'editedChannelPost', update: { edited_channel_post: {} } },
    { type: 'chosen_inline_result', prop: 'chosenInlineResult', update: { chosen_inline_result: {} } }
]

@TFController()
class TestController{
    @Start()
    start(@TFContext() ctx){}

    @Help()
    help(){}

    @Action("action")
    action(){}

    @Command("command")
    command(){}

    @Hears("hi")
    hears(){}

    @On(UpdateTypes.map(value => value.type) as any)
    on(@TFContext() ctx){
        expect(ctx).toBeDefined();
    }
}

describe('Add Metadata Controller', () => {
    it('add controller', function () {
        expect(MetadataArgsStorage.composerMetadata.find(value => value.target.prototype == TestController.prototype)).toBeDefined();
    });

    it('add start', function () {
        expect(MetadataArgsStorage.handlers.find(value => value.target == TestController.prototype && value.type == "start")).toBeDefined();
    });

    it('add help', function () {
        expect(MetadataArgsStorage.handlers.find(value => value.target == TestController.prototype && value.type == "help")).toBeDefined();
    });

    it('add action', function () {
        expect(MetadataArgsStorage.handlers.find(value => value.target == TestController.prototype && value.type == "action")).toBeDefined();
    });

    it('add command', function () {
        expect(MetadataArgsStorage.handlers.find(value => value.target == TestController.prototype && value.type == "command")).toBeDefined();
    });

    it('add hears', function () {
        expect(MetadataArgsStorage.handlers.find(value => value.target == TestController.prototype && value.type == "hears")).toBeDefined();
    });

    it('add inject parameters', function () {
        expect(MetadataArgsStorage.paramMetadata.find(value => value.target == TestController.prototype && value.propertyName == 'start')).toBeDefined();
    });
});


describe('Test Runtime Controller', () => {
    const bot = buildBot({
        controllers: [TestController]
    });

    UpdateTypes.forEach(update => {
        it('should provide update payload for ' + update.type, function () {
            bot.handleUpdate(update.update)
        });
    })


})

