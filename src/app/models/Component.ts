export class Component {
    private id: number;
    private name: string;
    private type: string;
    private value: string;
    private position: any;

    constructor(name: string, type: string, value: string, position: any) {
        this.name = name;
        this.type = type;
        this.value = value;
        this.position = position;
    }
}