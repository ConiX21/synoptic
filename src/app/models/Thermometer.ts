import { Component } from './component';

export class Thermometer extends Component {
    valueColor: string;
    unitColor: string;
    mercuryColor: string;

    constructor(name: string, type: string, value: string, valueColor: string, unitColor: string, mercuryColor: string, position: any) {
        super(name, type, value, position);
        this.valueColor = valueColor;
        this.unitColor = unitColor;
        this.mercuryColor = mercuryColor;
    }
}