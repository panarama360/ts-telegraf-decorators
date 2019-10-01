import {ParamsMetadata} from "./metadata/ParamsMetadata";
import {ComposerMetadata} from "./metadata/ComposerMetadata";
import {WizardStepMetadata} from "./metadata/WizardStepMetadata";
import {HandlerMetadata} from "./metadata/HandlerMetadata";
import {MiddlewareMetadata} from "./metadata/MiddlewareMetadata";

class MetadataStorage {

    public handlers: HandlerMetadata[] = [];

    public paramMetadata: ParamsMetadata[] = [];

    public composerMetadata: ComposerMetadata[] = [];

    public wizardStep: WizardStepMetadata[] = [];

    public middlewareMetadata: MiddlewareMetadata[] = [];

    public reset(){
        this.handlers = [];
        this.paramMetadata = [];
        this.composerMetadata = [];
        this.wizardStep = [];
        this.middlewareMetadata = [];
    }
}

export const MetadataArgsStorage =  new MetadataStorage();
