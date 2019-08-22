import {ParamsMetadata} from "./metadata/ParamsMetadata";
import {ComposerMetadata} from "./metadata/ComposerMetadata";
import {WizardStepMetadata} from "./metadata/WizardStepMetadata";
import {HandlerMetadata} from "./metadata/HandlerMetadata";

class MetadataStorage {

    public handlers: HandlerMetadata[] = [];

    public paramMetadata: ParamsMetadata[] = [];

    public composerMetadata: ComposerMetadata[] = [];

    public wizardStep: WizardStepMetadata[] = []
}

export default new MetadataStorage();
