import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
declare var jQuery;

@Component({
  selector: 'ny-modal-text',
  templateUrl: './modal-text.component.html',
  styleUrls: ['./modal-text.component.css']
})
export class ModalTextComponent implements OnInit, OnChanges {
  @Input() activeComponent;
  @Input() property;
  control: FormControl;

  public textForm: FormGroup;
  constructor(public fb: FormBuilder) { }

  ngOnInit() {
    //validate form
    this.textForm = this.fb.group({
      name: this.fb.control('', [Validators.required, Validators.maxLength(17)])
    });

    //Set the control for set default value
    this.control = <FormControl>this.textForm.controls['name'];
  }

  ngOnChanges(changes: any) {

    //If control was activated by the view render
    if (this.control != undefined) {
      //set the default value with a component value for the actual property
      this.control.setValue(this.activeComponent[this.property]);
    }
  }

  register(form) {
    this.activeComponent[this.property] = form.name;
  }

}
