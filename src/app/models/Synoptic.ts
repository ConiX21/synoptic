import { Component } from './component';

export class Synoptic{
    public idSynoptic:number;
    public date:string;
    public title:string;
    public description:string;
    public image:string;
    public creator:string;
    public workspace?:any;

    private components = new Array <Component>();

    constructor() {}
}