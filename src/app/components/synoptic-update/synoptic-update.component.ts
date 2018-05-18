import { Component, OnInit, Input, ViewChild, animate, state, trigger, transition, style } from '@angular/core';
import { BaseComponent } from '../base-component';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Synoptic } from "../../models/Synoptic";
import { Router, NavigationExtras, ActivatedRoute, Params } from '@angular/router';

import { Crypto } from '../../utils/crypto';
import { AccountService } from '../../services/account.service';
import { SynopticService } from '../../services/synoptic.service';


declare var $: any;
declare var Dexie;

export const FILE_EXTS = {
  exts: ['jpg', 'png']
}

@Component({
  selector: 'app-synoptic-update',
  templateUrl: './synoptic-update.component.html',
  styleUrls: ['./synoptic-update.component.css'],
  animations: [trigger('visibility', [
    state('invisible', style({ opacity: 0 })),
    state('visible', style({ opacity: 1 })),
    transition('invisible => visible', animate(500))
  ])],
  providers: [AccountService, SynopticService]
})
export class SynopticUpdateComponent extends BaseComponent implements OnInit {
  element: any; 
  @ViewChild("fileInput") fileInput;
  public synopticForm: FormGroup;
  public synoptic: Synoptic = new Synoptic();
  public imageState: boolean = false;
  public currentDate: string;
  

  private session;
  private visible: boolean = false;
  private visibility: string = "invisible";

  public form: FormGroup;

  private essais: any = [
    {id: 1, name : "Essai 1"},
    {id: 2, name : "Essai 2"},
    {id: 3, name : "Essai 3"},
    {id: 4, name : "Essai 4"},
    {id: 5, name : "Essai 5"}
  ];

  private id: number;
  private saveData: any;

  constructor(public fb: FormBuilder, public router: Router, 
              private accountSvc: AccountService, 
              public crypto: Crypto,
              public activatedRoute: ActivatedRoute, 
              public synopticService: SynopticService) {
    super();
  }

  ngOnInit() {
    this.verifyLogin();
    this.activatedRoute.params.subscribe((params: Params) => {
      this.id = parseInt(params['id']);
    });
    this.onLoad();
    this.fadeIn();
    if (localStorage.getItem("save"+this.synoptic.idSynoptic) != null) {
      this.saveData = JSON.parse(localStorage.getItem("save"+this.synoptic.idSynoptic));
    }
    this.currentDate = new Date().toLocaleDateString('fr-FR');
  }
  
  ngAfterViewInit() {
    $(document).ready(function() {
      $('select').material_select();
      $('.materialboxed').materialbox();
    });
  }

  verifyLogin(): void {
    if (sessionStorage.getItem('lcp') != null) {
      this.session = this.crypto.decrypt(JSON.parse(sessionStorage.getItem('lcp'))); // decrypt marche pas
      this.fadeIn();
    } else {
      alert("Mode Dev: connectez vous via la page de login (avec n'importe quel login ou mdp)");
      this.router.navigate(['/']);
    }
  }

  fadeIn(): void {
    this.visible = true;
    setTimeout(() => {this.visibility = "visible";}, 0);
  }

  onLoad(): void {
    this.synopticForm = this.fb.group({
      name: this.fb.control(' ', [Validators.required, Validators.maxLength(20)]),
      description: this.fb.control(' ', [Validators.required, Validators.maxLength(200)]),
      image: this.fb.control(' ', []),
      creator: this.fb.control(' ', [Validators.required, Validators.maxLength(20)])
    });
    var db = new Dexie("saves");
    db.version(1).stores({
      save: '++id, data'
    });
    db.save.get(this.id, function(save) {
      return save.data;
    }).then(data => {
      this.saveData = data;

      this.synopticForm = this.fb.group({
        name: this.fb.control(this.saveData.title, [Validators.required, Validators.maxLength(20)]),
        description: this.fb.control(this.saveData.description, [Validators.required, Validators.maxLength(200)]),
        image: this.fb.control(this.saveData.img.name, []),
        creator: this.fb.control(this.saveData.creator, [Validators.required, Validators.maxLength(20)])
      });
      this.imageState = (this.checkExtension(this.saveData.img.name)) ? true : false;
      setTimeout(() => document.querySelector('img').src = this.saveData.img.data, 0);
      setTimeout(() => document.querySelector('img').width = 200, 0);
    });
  }

  register(form) {
    this.saveData.title = form.name;
    this.saveData.description = form.description;
    this.saveData.creator = form.creator;
    this.saveData.date = this.currentDate;
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
    this.router.navigate(["/synoptic/list"]);
  }

  cancel() {
    this.router.navigate(["/synoptic/list"], );
  }

  change(event) {
    let fi = this.fileInput.nativeElement;
    let reader = new FileReader();


    if (fi.files && fi.files[0]) {
      let fileToUpload = fi.files[0];
      this.imageState = (this.checkExtension(fileToUpload.name)) ? true : false;

      if (fileToUpload) {
        reader.addEventListener("load", function () {
          document.querySelector('img').src = reader.result;
          document.querySelector('img').width = 200;
        }, false);
        reader.readAsDataURL(fileToUpload);
        setTimeout(() => {
          this.synoptic.image = fileToUpload.name;
          localStorage.setItem(this.synoptic.image, reader.result);
          this.saveData.img.name = fileToUpload.name;
          this.saveData.img.data = reader.result;
        }, 500);
        
      }

      // reader.addEventListener("loadend", function (e) {
      //   //console.log(reader.result);
      //   console.log("load end");
      // })

      // reader.addEventListener("loadstart", function () {
      //   console.log("load start");
      // })

      // reader.addEventListener("progress", function (e) {
      //   console.log(e);
      // })
      
    }
  }

  extractExtension(filename: string) {
    return (/[.]/.exec(filename)) ? /[^.]+$/.exec(filename)[0] : undefined;
  }

  checkExtension(filename: string) {
    let ext = this.extractExtension(filename);
    return (FILE_EXTS.exts.indexOf(ext) != -1) ? true : false;
  }

  getSynopticForNavigationExtras(form):NavigationExtras {
    this.synoptic.title = form.name;
    this.synoptic.description = form.description;
    this.synoptic.creator = form.creator;
    this.synoptic.date = this.currentDate;

    let navigationExtras: NavigationExtras = {
      queryParams: {id: this.id}
    };
    return navigationExtras;
  }
}
