import { Component } from './component';

export class Gauge extends Component {
    valueColor: string;
    unitColor: string;

    constructor(name: string, type: string, value: string, valueColor: string, unitColor: string, position: any) {
        super(name, type, value, position);
        this.valueColor = valueColor;
        this.unitColor = unitColor;
    }
}