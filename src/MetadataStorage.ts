import {StartMetadata} from "./metadata/StartMetadata";
import {CommandMetadata} from "./metadata/CommandMetadata";
import {HelpMetadata} from "./metadata/HelpMetadata";
import {OnMetadata} from "./metadata/OnMetadata";
import {HearsMetadata} from "./metadata/HearsMetadata";
import {ControllerMetadata} from "./metadata/ControllerMetadata";
import {LeaveMetadata} from "./metadata/LeaveMetadata";
import {EnterMetadata} from "./metadata/EnterMetadata";

class MetadataStorage {

    private startMetadata: StartMetadata[] = []
    private commandMetadata: CommandMetadata[] = []
    private helpMetadata: HelpMetadata[] = []
    private hearsMetadata: HearsMetadata[] = []
    private onMetadata: OnMetadata[] = []
    private leaveMetadata: LeaveMetadata[] = []
    private enterMetadata: EnterMetadata[] = []

    private controllerMetadata: ControllerMetadata[] = []

    addStartMetadata(metadata: StartMetadata): void{
        this.startMetadata.push(metadata)
    }

    getStartMetadata(): StartMetadata[]{
        return this.startMetadata;
    }

    addCommandMetadata(metadata: CommandMetadata): void{
        this.commandMetadata.push(metadata)
    }

    getCommandMetadata(): CommandMetadata[]{
        return this.commandMetadata;
    }

    addHelpMetadata(metadata: HelpMetadata): void{
        this.helpMetadata.push(metadata)
    }

    getHelpMetadata(): HelpMetadata[]{
        return this.helpMetadata;
    }

    addOnMetadata(metadata: OnMetadata): void{
        this.onMetadata.push(metadata)
    }

    getOnMetadata(): OnMetadata[]{
        return this.onMetadata;
    }

    addHearsMetadata(metadata: HearsMetadata): void{
        this.hearsMetadata.push(metadata)
    }

    getHearsMetadata(): HearsMetadata[]{
        return this.hearsMetadata;
    }

    addControllerMetadata(metadata: ControllerMetadata): void{
        this.controllerMetadata.push(metadata)
    }

    getControllerMetadata(): ControllerMetadata[]{
        return this.controllerMetadata;
    }

    addLeaveMetadata(metadata: LeaveMetadata): void{
        this.leaveMetadata.push(metadata)
    }

    getLeaveMetadata(): LeaveMetadata[]{
        return this.leaveMetadata;
    }

    addEnterMetadata(metadata: EnterMetadata): void{
        this.enterMetadata.push(metadata)
    }

    getEnterMetadata(): EnterMetadata[]{
        return this.enterMetadata;
    }

}
export default new MetadataStorage();