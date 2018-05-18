import { Component, OnInit, ViewChild, animate, state, trigger, transition, style } from '@angular/core';
import { BaseComponent } from '../base-component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Synoptic } from "../../models/Synoptic";
import { Router, NavigationExtras } from '@angular/router';
import { SynopticService } from '../../services/synoptic.service';
import { Essai } from '../../models/Essai';

declare var $: any;
declare var Dexie;

export const FILE_EXTS = {
  exts: ['jpg', 'png', "PNG", "JPG"]
}

@Component({
  selector: 'ny-synoptic-add',
  templateUrl: './synoptic-add.component.html',
  styleUrls: ['./synoptic-add.component.css'],
  providers : [SynopticService]
})
export class SynopticAddComponent extends BaseComponent implements OnInit {
  @ViewChild("fileInput") fileInput;
  public synopticForm: FormGroup;
  public synoptic: Synoptic = new Synoptic();
  public imageState: boolean = false;
  public currentDate: string;
  public essais: Array<Essai>;
  private saveData: any;

  constructor(public synopticSvc: SynopticService,public fb: FormBuilder, public router: Router) {
    super()
  }

   /**
   * @author Nicolas GASQUET
   * @description Initialize component
   */
  ngOnInit() {
    //Retrieve 'Essais'
    this.synopticSvc.getEssais().subscribe(ess => {
      this.essais = ess;
   }, error => {console.log(error)});

   //Initialize Form to create empty Synoptic
    this.currentDate = new Date().toLocaleDateString('fr-FR');
    this.synoptic.image = "";
    this.synopticForm = this.fb.group({
      name: this.fb.control('', [Validators.required, Validators.maxLength(20)]),
      description: this.fb.control('', [Validators.required, Validators.maxLength(200)]),
      image: this.fb.control('', []),
      creator: this.fb.control('', [Validators.required, Validators.maxLength(20)])
    })
    this.saveData = {
      title: "",
      date: this.currentDate,
      description: "",
      creator: "",
      img: {
        name: "",
        data: "",
        position: {
          left: null,
          top: null
        }
      },
      components: Array(),
      zoom: 0
    }  
  }

   /**
   * @author Nicolas GASQUET
   * @description After initialize component
   */
  ngAfterViewInit() {
    //Add event for select input HTML 
     $('select').material_select();
  }
 
   /**
   * @author Nicolas GASQUET
   * @description Register
   * @param form - form where synoptic data was write
   */
  register(form) {
    var test = {name: form.name, description: form.description, creator: form.creator, currentDate: this.formatDate(new Date(Date.now()))};

    //this.formatDate(Date.now())
    // this.saveData.title = form.name;
    // this.saveData.description = form.description;
    // this.saveData.creator = form.creator;
    // this.saveData.date = this.currentDate;

    //Redirect to Synoptics route
    //this.router.navigate(["/synoptics"]);
  }

  /**
   * @author Nicolas GASQUET
   * @description Fired when we change file input to choosing picture for synoptic
   * @param event : Event fired (change)
   */
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
          return reader.result;
        }, false);
        reader.readAsDataURL(fileToUpload);
        setTimeout(() => {
          this.synoptic.image = fileToUpload.name;
          this.saveData.img.name = fileToUpload.name;
          this.saveData.img.data = reader.result;
        }, 500);
      }
    }
  }

  /**
   * @author Nicolas GASQUET
   * @description Get file extension
   * @param filename : file name who need to extract extension
   */
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
      queryParams: this.synoptic
    };
    return navigationExtras;
  }

  formatDate(currentDate) {
    return currentDate.getFullYear() + '-' +
      (currentDate.getMonth() < 9 ? '0' : '') + (currentDate.getMonth()+1) + '-' +
      (currentDate.getDate() < 10 ? '0' : '') + currentDate.getDate();
  }
}
