import { experimental } from '../../environments/experimental';
import { colorTemplate } from '../../environments/color-skin';

export class BaseComponent {
    public colorSkin: string;
    public experimentalMode: Boolean;

    constructor() {
        this.colorSkin = colorTemplate.skin;
        this.experimentalMode = experimental.disable;
    }
}
