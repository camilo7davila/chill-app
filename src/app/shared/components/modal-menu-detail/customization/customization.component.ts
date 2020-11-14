import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Customizations } from "../../../../core/interfaces/restaurant.interface";

@Component({
  selector: 'app-customization-component',
  templateUrl: './customization.component.html',
  styleUrls: ['./customization.component.scss']
})
export class CustomizationComponent implements OnInit {
  @Input() customizations: Customizations[] = [];

  public customForm: FormGroup;

  
  get customElements(): FormArray{
    return this.customForm.get('myChoises') as FormArray;
  }

  constructor(
    private fB: FormBuilder
  ) { }

  ngOnInit(): void {
    console.log(this.customizations);
    this.buildForm();
  }

  private buildForm() {
    this.customForm = this.fB.group({
      myChoises: new FormArray([])
    })
  }

  changeCheckbox({checked}, custom) {
    if(checked) {
      const createCustom = this.fB.group({
        id: [custom.id , [Validators.required]],
        image: [custom.image , [Validators.required]],
        name: [custom.name, [Validators.required]]
      })
      this.customElements.push(createCustom)
      console.log(this.customForm.value);
    } else {
      this.customElements.controls.forEach((ctrl: FormControl, index) => {
        if(ctrl.value.id === custom.id){
          this.customElements.removeAt(index);
          console.log(this.customForm.value);
          return
        }
      })
    }
  }

}
