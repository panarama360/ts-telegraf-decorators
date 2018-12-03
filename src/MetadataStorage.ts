import {StartMetadata} from "./metadata/StartMetadata";
import {CommandMetadata} from "./metadata/CommandMetadata";
import {HelpMetadata} from "./metadata/HelpMetadata";
import {OnMetadata} from "./metadata/OnMetadata";
import {HearsMetadata} from "./metadata/HearsMetadata";
import {ControllerMetadata} from "./metadata/ControllerMetadata";
import {LeaveMetadata} from "./metadata/LeaveMetadata";
import {EnterMetadata} from "./metadata/EnterMetadata";
import {ParamsMetadata} from "./metadata/ParamsMetadata";
import {ActionMetadata} from "./metadata";

class MetadataStorage {

    public startMetadata: StartMetadata[] = [];
    public commandMetadata: CommandMetadata[] = [];
    public helpMetadata: HelpMetadata[] = [];
    public hearsMetadata: HearsMetadata[] = [];
    public onMetadata: OnMetadata[] = [];
    public leaveMetadata: LeaveMetadata[] = [];
    public enterMetadata: EnterMetadata[] = [];
    public actionMetadata: ActionMetadata[] = [];
    public paramMetadata: ParamsMetadata[] = [];

    public controllerMetadata: ControllerMetadata[] = [];
}
export default new MetadataStorage();