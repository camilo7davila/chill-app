import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Addition } from "../../../../core/interfaces/restaurant.interface";

@Component({
  selector: 'app-additions-component',
  templateUrl: './additions.component.html',
  styleUrls: ['./additions.component.scss']
})
export class AdditionsComponent implements OnInit {
  @Input() additionsInput: Addition[];

  public formAdditions: FormGroup;
  public additions: Addition[];

  get customElementAdditions(): FormArray {
    return this.formAdditions.get('additions') as FormArray;
  }

  constructor(
    private fB: FormBuilder
  ) { }

  ngOnInit(): void {
    this.additions = this.additionsInput.map((addition) => ({ ...addition, total: 0, activeUi: false }))
    console.log(this.additions);
    this.formBuilder();
  }

  private formBuilder() {
    this.formAdditions = this.fB.group({
      additions: this.fB.array([])
    })
  }

  selectedAddition(addition: Addition, i) {
    this.additions[i].total = 1;
    const createAddition = this.fB.group({
      active: [addition.active],
      activeUi: [addition.activeUi],
      id: [addition.id],
      image: [addition.image],
      name: [addition.name],
      price: [addition.price],
      total: [addition.total],
    })
    this.customElementAdditions.push(createAddition);
    console.log(this.formAdditions.value)
  }

  deleteAddition(addition: Addition, i) {
    this.additions[i].total = 0
    this.customElementAdditions.controls.forEach((ctrl: FormControl, index) => {
      if(ctrl.value.id === addition.id) {
        this.customElementAdditions.removeAt(index);
        console.log(this.formAdditions.value)
        return
      }
    })
  }

  

}
