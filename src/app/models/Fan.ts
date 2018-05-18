import { Component } from './component';

export class Fan extends Component {
    valueColor: string;
    unitColor: string;
    fanColor: string;

    constructor(name: string, type: string, value: string, valueColor: string, unitColor: string, fanColor: string, position: any) {
        super(name, type, value, position);
        this.valueColor = valueColor;
        this.unitColor = unitColor;
        this.fanColor = fanColor;
    }
}