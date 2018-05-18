import {
  Component, Type, ComponentRef,
  ElementRef, ViewContainerRef, ReflectiveInjector, ComponentFactory,
  ComponentFactoryResolver, OnInit, ViewEncapsulation, ViewChild,
  ViewChildren, animate, state, trigger, transition, style
} from '@angular/core';
import { RatioService } from '../../services/ratio.service';
import { WorkspaceBaseComponent } from '../workspace-base-component';
import { IndicatorComponent } from '../indicator/indicator.component';
import { ThermometerComponent } from '../thermometer/thermometer.component';
import { FanComponent } from '../fan/fan.component';
import { GeneratorComponent } from '../generator/generator.component';
import { GaugeComponent } from '../gauge/gauge.component';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../../environments/environment';
import { PropertyService } from '../../services/property.service';

import { Router, Params } from '@angular/router';
import { Crypto } from '../../utils/crypto';
import { AccountService } from '../../services/account.service';

import { Thermometer } from '../../models/Thermometer';
import { Indicator } from '../../models/Indicator';
import { Generator } from '../../models/Generator';
import { Gauge } from '../../models/Gauge';
import { Fan } from '../../models/Fan';


//npm install @types/jquery --save-dev
//npm install @types/rapheal --save-dev
//reboot server
declare var jQuery;
declare var Dexie;

@Component({

  selector: 'ny-workspace',
  templateUrl: './workspace.component.html',
  styleUrls: ['./workspace.component.css'],
  animations: [trigger('interface', [
    state('invisible', style({ opacity: 0 })),
    state('visible', style({ opacity: 1 })),
    transition('invisible => visible', animate(500))
  ]),
  trigger('visibility', [
    state('invisible', style({ opacity: 0 })),
    state('visible', style({ opacity: 1 })),
    transition('invisible => visible', animate(500))
  ])],
  providers: [AccountService],
  encapsulation: ViewEncapsulation.None,
  entryComponents: [IndicatorComponent, ThermometerComponent, FanComponent, GeneratorComponent, GaugeComponent],
  host: {'(window:resize)': 'onResize(jQueryevent)'}
})
export class WorkspaceComponent implements OnInit {
  @ViewChild('dynamicComponentContainer', { read: ViewContainerRef }) dynamicComponentContainer: ViewContainerRef;
  @ViewChild('loader') loader;
  @ViewChild('color') color;
  @ViewChild('workspaceSettings') workspaceSettings;
  @ViewChild('yesNo') yesNo;
  @ViewChild('yesNoAll') yesNoAll;
  @ViewChild('menu') menu;
  components: Array<any> = new Array<any>();
  objectSettings: any;
  titleProperties: string;
  actualProp: string;
  workspace: WorkspaceComponent;
  stateInterface: string = "visible";
  private settingsJSON: any = {
    componentsState: [
      { IndicatorComponent: { state: true } },
      { ThermometerComponent: { state: true } },
      { MemoryComponent: { state: true } },
      { GaugeComponent: { state: true } },
      { GeneratorComponent: { state: true } },
      { FanComponent: { state: true } }
    ]
  };

  private session;
  private visible: boolean = false;
  private visibility: string = "invisible";

  private image: any = {name: "", data: "", position: {left: 0, top: 0}};

  private actualZoom: number = 0;
  private defaultSize;
  private sizes: Array<any>;

  private originalImgSize;
  private defaultImgRatio;
  private imgRatios;

  private oldWindowSize = {height: window.innerHeight, width: window.innerWidth};
  private id: number;
  private title: string;
  private date: string;
  private description: string;
  private creator: string;
  private saveData: any;
  private isEdit: boolean;

  constructor(private route: ActivatedRoute, private ref: ElementRef, private resolver: ComponentFactoryResolver, private ratioSvc: RatioService, private propertySvc: PropertyService, private accountSvc: AccountService, public router: Router) { }

  ngAfterContentInit() {
    this.workspace = this;
  }

  ngOnInit() {
     this.route.params.subscribe((params: Params) => {
       this.id = parseInt(params['id']);
       this.isEdit = (params['mode'] == "edit");
     });

     this.reloadRatio();
    this.onLoad();
  }

  ngAfterViewInit() {
    jQuery(document).ready(function(){
      // the "href" attribute of .modal-trigger must specify the modal ID that wants to be triggered
      jQuery('.modal').modal();
    });
    if (localStorage.getItem('save'+this.id) == null) {
      jQuery('img').css({top: window.innerHeight/2 - jQuery('img').height()/2, left: window.innerWidth/2 - jQuery('img').width()/2});
    }
    if (this.isEdit) {
      jQuery('img').draggable({
        opacity: 0.35,
        containment: "body"
      });
    }   
    
  }

  getRatio(size: number): any {
    return {"height": this.defaultSize.height*size, "width": this.defaultSize.width*size};
  }

  getImgRatio(size: number): any {
    return {"height": this.defaultImgRatio.height*size, "width": this.defaultImgRatio.width*size};
  }


  onResize(event): void {
    this.reloadRatio();
    //this.reloadImgRatio();
    this.reloadPosition();
    this.oldWindowSize = {height: window.innerHeight, width: window.innerWidth};
    for(let i = 0 ; i < this.components.length ; ++i) {
      this.components[i].onZoom(this.sizes[this.actualZoom]);
    }
  }

  //raffraichissement des tailles en fonction de la taille de la fenêtre
  reloadRatio(): void {
    if (window.innerWidth > window.innerHeight) {
      this.defaultSize = {"height": window.innerHeight/6.5, "width": (window.innerHeight/6.5)*1.25};
      this.sizes = [this.defaultSize, this.getRatio(1.2), this.getRatio(1.4), this.getRatio(1.6)];
    } else {
      this.defaultSize = {"height": (window.innerWidth/5.5)/1.25, "width": window.innerWidth/5.5};
      this.sizes = [this.defaultSize, this.getRatio(1.2), this.getRatio(1.4), this.getRatio(1.6)];
    }
    this.ratioSvc.setRatio(this.sizes[this.actualZoom]);
  }

  //raffraichissement de la taille de l'image en fonction de la taille de la fenêtre
  reloadImgRatio(): void {
    if (window.innerHeight*this.defaultImgRatio.height <= this.originalImgSize.height) {
      jQuery('img').css({
        height: window.innerHeight*this.defaultImgRatio.height
      });
    } else {
      jQuery('img').css({
        height: this.originalImgSize.height
      });
    }
  }

  //raffraichissement des positions en fonction de la taille de la fenêtre
  reloadPosition(): void {
    var componant = this.dynamicComponentContainer.element.nativeElement.nextElementSibling;
    while (componant != null) {
      jQuery(componant).css(
        {
          top: (jQuery(componant).position().top/this.oldWindowSize.height * window.innerHeight), 
          left: (jQuery(componant).position().left/this.oldWindowSize.width * window.innerWidth)
        });
      componant = componant.nextElementSibling;
    }
    jQuery('img').css({
      top: jQuery('img').position().top/this.oldWindowSize.height * window.innerHeight,
      left: jQuery('img').position().left/this.oldWindowSize.width * window.innerWidth
    });
  }

  load(): void {
    let parent = this;

    this.propertySvc.propertyChangedjQuery.subscribe(
      prop => {
        this.actualProp = prop;
      });

    jQuery(".button-collapse").sideNav();
    jQuery("#modalColor.modal").modal();
    jQuery("#modalText.modal").modal();

    //Modale qui indique le niveau de chargement de worksapce
    jQuery("#modalLoader.modal").modal({
      dismissible: false,
      ready: function (modal, trigger) {
        parent.initializeWorkspace()
      }
    });

    // Ouverture de la modale d'initialisation du workspace
    jQuery("#modalLoader").modal('open');
  }

  //Gestion du zoom
  onZoom(way: string): void {
    var componant = this.dynamicComponentContainer.element.nativeElement.nextElementSibling;
    var componantsList: Array <any>= Array<any>();

    //Zoom in
    if (way === "in") {
      this.ratioSvc.setRatio(this.sizes[++this.actualZoom]);
      for (let i = 0 ; i < this.dynamicComponentContainer.length ; ++i) {
        if (componant != null) componantsList.push(componant);
        componant = componant.nextElementSibling;
      }

      //tri des composants de gauche à droite
      componantsList.sort(function (a, b) {
        return jQuery(a).position().left - jQuery(b).position().left;
      });

      //parcours des composants pour gérer le déplacement de ceux-ci lors du zoom
      for (let i = 0 ; i < componantsList.length ; ++i) {
        for (let j = i+1 ; j < componantsList.length ; ++j) {
          if ((jQuery(componantsList[j]).position().left >= jQuery(componantsList[i]).position().left &&
              jQuery(componantsList[j]).position().left < jQuery(componantsList[i]).position().left+this.sizes[this.actualZoom].width &&
              jQuery(componantsList[j]).position().top >= jQuery(componantsList[i]).position().top &&
              jQuery(componantsList[j]).position().top < jQuery(componantsList[i]).position().top+this.sizes[this.actualZoom].height) ||
              (jQuery(componantsList[j]).position().top+this.sizes[this.actualZoom].height >= jQuery(componantsList[i]).position().top &&
              jQuery(componantsList[j]).position().top+this.sizes[this.actualZoom].height < jQuery(componantsList[i]).position().top+this.sizes[this.actualZoom].height &&
              jQuery(componantsList[j]).position().left >= jQuery(componantsList[i]).position().left &&
              jQuery(componantsList[j]).position().left < jQuery(componantsList[i]).position().left+this.sizes[this.actualZoom].width))
          {
            jQuery(componantsList[j]).css({left: jQuery(componantsList[i]).position().left+this.sizes[this.actualZoom].width});
            if (jQuery(componantsList[j]).position().top + this.sizes[this.actualZoom].height > window.innerHeight && jQuery(componantsList[j]).position().left + this.sizes[this.actualZoom].width > window.innerWidth) {
              jQuery(componantsList[j]).css({top: window.innerHeight-this.sizes[this.actualZoom].height, left: window.innerWidth-this.sizes[this.actualZoom].width});
            }
            else if (jQuery(componantsList[j]).position().top + this.sizes[this.actualZoom].height > window.innerHeight) {
              jQuery(componantsList[j]).css({top: window.innerHeight-this.sizes[this.actualZoom].height});
            }
            else if (jQuery(componantsList[j]).position().left + this.sizes[this.actualZoom].width > window.innerWidth) {
              jQuery(componantsList[j]).css({left: window.innerWidth-this.sizes[this.actualZoom].width});
            }
          }
        }
        this.components[i].onZoom(this.sizes[this.actualZoom]);
        if (jQuery(componantsList[i]).position().top + this.sizes[this.actualZoom].height > window.innerHeight && jQuery(componantsList[i]).position().left + this.sizes[this.actualZoom].width > window.innerWidth) {
          jQuery(componantsList[i]).animate({top: window.innerHeight-this.sizes[this.actualZoom].height, left: window.innerWidth-this.sizes[this.actualZoom].width}, 200);
        }
        else if (jQuery(componantsList[i]).position().top + this.sizes[this.actualZoom].height > window.innerHeight) {
          jQuery(componantsList[i]).animate({top: window.innerHeight-this.sizes[this.actualZoom].height}, 200);
        }
        else if (jQuery(componantsList[i]).position().left + this.sizes[this.actualZoom].width > window.innerWidth) {
          jQuery(componantsList[i]).animate({left: window.innerWidth-this.sizes[this.actualZoom].width}, 200);
        }
      }
    } else { //Zoom out
      this.ratioSvc.setRatio(this.sizes[--this.actualZoom]);
      for(let i = 0 ; i < this.components.length ; ++i) {
        this.components[i].onZoom(this.sizes[this.actualZoom]);
      }
    }
  }

  onSettings(): void {
    this.objectSettings = this;
    jQuery('.button-collapse').sideNav('show');
    this.setTitleProperties("Workspace properties");
  }

  onDeleteAll(): void {
    jQuery('#modalYesNoAll').modal('open');
    this.yesNoAll.onClick.subscribe((yesNo) => {
      if (yesNo) {
        this.dynamicComponentContainer.clear();
        this.components = new Array<any>();
      }
    })
  }

  onSave(): void {
    //parcours des composants du workspace pour stockage dans un tableau
    var componentsList = new Array();
    for (var component of this.components) {
      switch (component.constructor.name) {
        case "ThermometerComponent": {
          componentsList.push(
            new Thermometer(
              component.name,
              "Thermometer",
              component.value, 
              component.valueColor, 
              component.unitColor, 
              component.mercuryColor, 
              {
                left: jQuery(component._element.nativeElement).position().left/window.innerWidth, 
                top: jQuery(component._element.nativeElement).position().top/window.innerHeight
              }
            )
          );
          break;
        }
        case "IndicatorComponent": {
          componentsList.push(
            new Indicator(
              component.name, 
              "Indicator",
              component.status, 
              component.ledColorTrue, 
              component.ledColorFalse, 
              component.textColorTrue, 
              component.textColorFalse, 
              component.textTrue, 
              component.textFalse, 
              {
                left: jQuery(component._element.nativeElement).position().left/window.innerWidth, 
                top: jQuery(component._element.nativeElement).position().top/window.innerHeight
              }
            )
          );
          break;
        }
        case "GeneratorComponent": {
          componentsList.push(
            new Generator(
              component.name, 
              "Generator",
              component.value, 
              component.valueColor, 
              component.unitColor, 
              component.batteryColor, 
              {
                left: jQuery(component._element.nativeElement).position().left/window.innerWidth, 
                top: jQuery(component._element.nativeElement).position().top/window.innerHeight
              }
            )
          );
          break;
        }
        case "GaugeComponent": {
          componentsList.push(
            new Gauge(
              component.name, 
              "Gauge",
              component.value, 
              component.valueColor, 
              component.unitColor, 
              {
                left: jQuery(component._element.nativeElement).position().left/window.innerWidth, 
                top: jQuery(component._element.nativeElement).position().top/window.innerHeight
              }
            )
          );
          break;
        }
        case "FanComponent": {
          componentsList.push(
            new Fan(
              component.name, 
              "Fan",
              component.value, 
              component.valueColor, 
              component.unitColor, 
              component.fanColor, 
              {
                left: jQuery(component._element.nativeElement).position().left/window.innerWidth, 
                top: jQuery(component._element.nativeElement).position().top/window.innerHeight
              }
            )
          );
          break;
        }
        default: {
          break;
        }
      }
    }
    
    //affectation de l'objet JSON de sauvegarde
    this.saveData = {
      title: this.title,
      date: this.date,
      description: this.description,
      creator: this.creator,
      img: {
        name: this.image.name,
        data: this.image.data,
        position: {
          left: jQuery('img').position().left/window.innerWidth,
          top: jQuery('img').position().top/window.innerHeight
        }
      },
      components: componentsList,
      zoom: this.actualZoom
    };

    // Sauvegarde dans la base de données
    var db = new Dexie("saves");
    db.version(1).stores({
      save: '++id, data'
    });
    db.save.put({
      id: this.id,
      data: this.saveData
    }).catch(function(error) {
      alert("Error");
    });
  }

  onLoad(): void {
    //chargement du synoptique dans la base
    var db = new Dexie("saves");
    db.version(1).stores({
      save: '++id, data'
    });
    db.save.get(this.id, function(save) {
      return save.data;
    }).then(data => {
      this.saveData = data;
      if (this.saveData != null) {
        this.title = this.saveData.title;
        this.date = this.saveData.date;
        this.description = this.saveData.description;
        this.creator = this.saveData.creator;
        this.image.name =this.saveData.img.name;
        this.image.data = this.saveData.img.data;
        this.image.position = this.saveData.img.position;

        //chargement du zoom
        this.actualZoom = this.saveData.zoom;
        this.menu.actualZoom = this.actualZoom;
        this.ratioSvc.setRatio(this.sizes[this.actualZoom]);

        //affichage de l'image
        if (this.image.data == null) {
          this.image.data = "";
        }        
        if (this.image.data.length > 0) {
          jQuery('img').attr("src", this.image.data);
          this.originalImgSize = {height: jQuery('img').height(), width: jQuery('img').width()};
          this.defaultImgRatio = {height: this.originalImgSize.height/window.innerHeight, width: this.originalImgSize.width/window.innerWidth};
          this.imgRatios = [this.defaultImgRatio, this.getImgRatio(1.2), this.getImgRatio(1.4), this.getImgRatio(1.6)];
        }
        if (this.image.position.left == null) {
          jQuery('img').css({top: (window.innerHeight/2)-(jQuery('img').height()/2), left: (window.innerWidth/2)-(jQuery('img').width()/2)});
        } else {
          jQuery('img').css({top: this.image.position.top*window.innerHeight, left: this.image.position.left*window.innerWidth});
        }
        // Pour cacher l'image si elle est plus grande que la fenêtre
        if (this.image.position.left*window.innerWidth + this.originalImgSize.width >= window.innerWidth || this.image.position.top + this.originalImgSize.height >= window.innerHeight) {
          jQuery('img').hide();
        }

        //génération des composants
        for (var component of this.saveData.components) {
          switch (component.type) {
            case 'Thermometer': {
              this.loadComponent(ThermometerComponent, component);
              break;
            }
            case 'Indicator': {
              this.loadComponent(IndicatorComponent, component);
              break;
            }
            case 'Generator': {
              this.loadComponent(GeneratorComponent, component);
              break;
            }
            case 'Gauge': {
              this.loadComponent(GaugeComponent, component);
              break;
            }
            case 'Fan': {
              this.loadComponent(FanComponent, component);
              break;
            }
            default: {
              break;
            }
          }
        }
      }
    });   
  }

  loadComponent<T extends WorkspaceBaseComponent>(component: any, load: any): void {
    //creation de la factory de composnant
    let componentFactory = this.resolver.resolveComponentFactory<WorkspaceBaseComponent>(component);

    //ajout du composant au container
    let componentRef = this.dynamicComponentContainer.createComponent(componentFactory);
    componentRef.instance.size = this.sizes[this.actualZoom];

    //positionnement du composant
    jQuery(componentRef.instance._element.nativeElement).css({left: load.position.left*window.innerWidth, top: load.position.top*window.innerHeight});

    //attribution des propriétés du composant
    switch(component) {
      case ThermometerComponent: {
        componentRef.instance.loadProperties(
          {
            name: load.name,
            mercuryColor: load.mercuryColor,
            unitColor: load.unitColor,
            valueColor: load.valueColor
          });
        break;
      }
      case IndicatorComponent: {
        componentRef.instance.loadProperties(
          {
            name: load.name,
            ledColorTrue: load.ledColorTrue,
            ledColorFalse: load.ledColorFalse,
            textColorTrue: load.textColorTrue,
            textColorFalse: load.textColorFalse,
            textTrue: load.textTrue,
            textFalse: load.textFalse
          });
        break;
      }
      case GeneratorComponent: {
        componentRef.instance.loadProperties(
          {
            name: load.name,
            batteryColor: load.batteryColor,
            unitColor: load.unitColor,
            valueColor: load.valueColor
          });
        break;
      }
      case GaugeComponent: {
        componentRef.instance.loadProperties(
          {
            name: load.name,
            unitColor: load.unitColor,
            valueColor: load.valueColor
          });
        break;
      }
      case FanComponent: {
        componentRef.instance.loadProperties(
          {
            name: load.name,
            fanColor: load.fanColor,
            unitColor: load.unitColor,
            valueColor: load.valueColor
          });
        break;
      }
      default: {
        break;
      }
    }

    //enregritrement de l'action close du component
    componentRef.instance.closeEvent.subscribe(() => {
      // this.components.splice(componentRef.instance.id, 1);
      // console.log(componentRef.instance.id)
      // console.log(this.components)
      this.deleteComponentInArray(componentRef.instance.id)
      //destroye du composant actif
      componentRef.destroy();
    });
    //Place la position pour le trouver dans le tableau
    componentRef.instance.id = this.components.length;

    //Ajout dans le tableau des components le composant ajouté
    this.components.push(componentRef.instance);

    this.reactiveFilter(component.name)
    
    // cache les boutons et desactive le drag & drop si on est en édition
    if (!this.isEdit) {
      componentRef.instance.hideButtons();
      jQuery(componentRef.instance._element.nativeElement).draggable({disabled: true});
    }

    componentRef.instance.settingsEvent.subscribe((item) => {
      // OUvertyure du panel properties
      jQuery('.button-collapse').sideNav('show');

      //Passage de l'objet en cours de  configuration au palke de properties
      this.objectSettings = item.object;
      this.setTitleProperties(item.title);
    });

    //enregistrement de l'action suppression par modal
    componentRef.instance.onCloseClick.subscribe(() => {
      jQuery('#modalYesNo').modal('open');
      this.yesNo.onClick.subscribe((yesNo) => {
        if (yesNo) {
          this.deleteComponentInArray(componentRef.instance.id);
          //destroye du composant actif
          componentRef.destroy();
        }
      })
    });
  }


  //Creation de composants
  onCreated(name: string): void {
    switch (name) {
      case "Indicator":
        this.setTitleProperties("Indicator");
        this.createComponent(IndicatorComponent);
        break;
      case "Thermometer":
        this.setTitleProperties("Thermometer");
        this.createComponent(ThermometerComponent);
        break;
      case "Fan":
        this.setTitleProperties("Fan");
        this.createComponent(FanComponent);
        break;
      case "Generator":
        this.setTitleProperties("Generator");
        this.createComponent(GeneratorComponent);
        break;
      case "Gauge":
        this.setTitleProperties("Gauge");
        this.createComponent(GaugeComponent);
        break;
    }
  }

  closePanel(event): void {
    //this.panelProperties.state = "inactive";
  }

  //Components Factory Creator
  createComponent<T extends WorkspaceBaseComponent>(component: any): void {
    //creation de la factory de composnant
    let componentFactory = this.resolver.resolveComponentFactory<WorkspaceBaseComponent>(component);

    //ajout du composant au container
    let componentRef = this.dynamicComponentContainer.createComponent(componentFactory);
    componentRef.instance.size = this.sizes[this.actualZoom];

    //enregritrement de l'action close du component
    componentRef.instance.closeEvent.subscribe(() => {
      // this.components.splice(componentRef.instance.id, 1);
      // console.log(componentRef.instance.id)
      // console.log(this.components)

      this.deleteComponentInArray(componentRef.instance.id)
      //destroye du composant actif
      componentRef.destroy();
    });


    //Place la position pour le trouver dans le tableau
    componentRef.instance.id = this.components.length;

    //Ajout dans le tableau des components le composant ajouté
    this.components.push(componentRef.instance);


    this.reactiveFilter(component.name)

    componentRef.instance.settingsEvent.subscribe((item) => {
      // OUvertyure du panel properties
      jQuery('.button-collapse').sideNav('show');


      //Passage de l'objet en cours de  configuration au palke de properties
      this.objectSettings = item.object;
      this.setTitleProperties(item.title);
      //console.log(item);

    });

    //enregistrement de l'action suppression par modal
    componentRef.instance.onCloseClick.subscribe(() => {
      jQuery('#modalYesNo').modal('open');
      this.yesNo.onClick.subscribe((yesNo) => {
        if (yesNo) {
          this.deleteComponentInArray(componentRef.instance.id);
          //destroye du composant actif
          componentRef.destroy();
        }
      })
    });
  }

  initializeWorkspace() {
    if (environment.production) {
      setTimeout(() => {
        this.changeLoaderText("Retrieve Synoptic properties...");
        setTimeout(() => {
          this.changeLoaderText("Create Components...");
          setTimeout(() => {
            this.changeLoaderText("Set Interface...");
            this.stateInterface = "visible";
            setTimeout(() => {
              jQuery("#modalLoader").modal('close');
            }, 1000);
          }, 1500);
        }, 1500);
      }, 1500);
    }
    else {
      jQuery("#modalLoader").modal('close');
      this.stateInterface = "visible";
    }
  }

  verifyLogin(): void {
    // if (sessionStorage.getItem('lcp') != null) {
    //   this.session = this.crypto.decrypt(JSON.parse(sessionStorage.getItem('lcp'))); // decrypt marche pas
    //   this.fadeIn();
    //   this.load();
    // } else {
    //   alert("Mode Dev: connectez vous via la page de login (avec n'importe quel login ou mdp)");
    //   this.router.navigate(['/']);
    // }
  }

  fadeIn(): void {
    this.visible = true;
    setTimeout(() => {this.visibility = "visible";}, 0);
  }

  changeLoaderText(text: string) {
    this.loader.statusLoader = text;
  }

  setTitleProperties(title: string) {
    this.titleProperties = title
  }

  setStateOfPropertiesJSON(property: any, value: any) {
    for (let i = 0; i < this.settingsJSON.componentsState.length; i++) {
      if (this.settingsJSON.componentsState[i] && this.settingsJSON.componentsState[i].hasOwnProperty(property)) {

        this.settingsJSON.componentsState[i][property].state = value;
      }
    }

    console.log(this.settingsJSON.componentsState)
  }

  getStateOfPropertiesJSON(property: any): any {

    for (let i = 0; i < this.settingsJSON.componentsState.length; i++) {
      if (this.settingsJSON.componentsState[i] && this.settingsJSON.componentsState[i].hasOwnProperty(property)) {
        return this.settingsJSON.componentsState[i][property].state;
      }
    }

  }

  //Apres ajout d'un composannt qui serait filtré l'etat du filtre pour le type de composant et remis a visible
  reactiveFilter(componentName: string) {

    if (!this.getStateOfPropertiesJSON(componentName)) {
      this.setStateOfPropertiesJSON(componentName, true);
      this.changeFilterState(componentName, true);
      this.workspaceSettings.changeCheckBoxState(`filter${componentName}`);
    }
  }

  changeFilterState(component: string, state) {
    for (let a of this.components) {
      if (a.constructor.name === component) {
        a.filterState = state;
      }
    }
  }

  getAllFiltersState() {
    return this.settingsJSON.componentsState;
  }


  deleteComponentInArray(id:number) {
    for (let i = 0; i < this.components.length; i++) {
      if (this.components[i].id == id) {
         this.components.splice(i, 1);
        return;
      }
    }
  }
}
