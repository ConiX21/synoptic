import { Component } from './component';

export class Generator extends Component {
    valueColor: string;
    unitColor: string;
    batteryColor: string;

    constructor(name: string, type: string, value: string, valueColor: string, unitColor: string, batteryColor: string, position: any) {
        super(name, type, value, position);
        this.valueColor = valueColor;
        this.unitColor = unitColor;
        this.batteryColor = batteryColor;
    }
}