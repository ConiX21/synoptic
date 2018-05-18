import { Component } from './component';

export class Indicator extends Component {
    ledColorTrue: string;
    ledColorFalse: string;
    textColorTrue: string;
    textColorFalse: string;
    textTrue: string;
    textFalse: string;

    constructor(name: string, type: string, value: string, ledColorTrue: string, ledColorFalse: string, textColorTrue: string, textColorFalse: string, textTrue: string, textFalse: string, position: any) {
        super(name, type, value, position);
        this.ledColorTrue = ledColorTrue;
        this.ledColorFalse = ledColorFalse;
        this.textColorTrue = textColorTrue;
        this.textColorFalse = textColorFalse;
        this.textTrue = textTrue;
        this.textFalse = textFalse;
    }
}