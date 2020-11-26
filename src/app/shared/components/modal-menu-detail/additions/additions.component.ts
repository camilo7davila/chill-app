import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Addition } from "../../../../core/interfaces/restaurant.interface";

@Component({
  selector: 'app-additions-component',
  templateUrl: './additions.component.html',
  styleUrls: ['./additions.component.scss']
})
export class AdditionsComponent implements OnInit {
  @Input() additionsInput: Addition[];
  @Output() changeAdditions: EventEmitter<Addition[]> = new EventEmitter<Addition[]> ();

  public formAdditions: FormGroup;
  public additions: Addition[];

  get customElementAdditions(): FormArray {
    return this.formAdditions.get('additions') as FormArray;
  }

  constructor(
    private fB: FormBuilder
  ) { }

  ngOnInit(): void {
    this.formBuilder();
    this.additions = this.additionsInput.map((addition) => ({ ...addition, total: 0, activeUi: false }));
    this.additions.forEach((addition) => {
      const additionPush = this.fB.group({
        active: [addition.active, Validators.required],
        activeUi: [addition.activeUi],
        image: [addition.image],
        id: [addition.id],
        name: [addition.name],
        price: [addition.price],
        total: [addition.total]
      })
      
      this.customElementAdditions.push(additionPush);
      this.changeAdditions.emit(this.customElementAdditions.value);
    })
  }

  private formBuilder() {
    this.formAdditions = this.fB.group({
      additions: this.fB.array([])
    })
  }

  selectedAddition(addition: Addition, i) {
    this.additions[i].total = 1;
    this.customElementAdditions.controls.forEach((ctrl: FormControl, index) => {
      if(ctrl.value.id === addition.id) {
        ctrl.patchValue({ ...ctrl, total: 1 });
        this.changeAdditions.emit(this.customElementAdditions.value)
      }
      return
    })
  }

  deleteAddition(addition: Addition, i) {
    this.additions[i].total = 0
    this.customElementAdditions.controls.forEach((ctrl: FormControl, index) => {
      if (ctrl.value.id === addition.id) {
        ctrl.patchValue({ ...ctrl, total: 0 });
        this.changeAdditions.emit(this.customElementAdditions.value)
      }
    })
  }

  sumAddition(addition: Addition, index) {
    this.customElementAdditions.controls.forEach((ctrl: FormControl) => {
      if (addition.id === ctrl.value.id) {
        ctrl.patchValue({ ...ctrl, total: ctrl.value.total + 1 });
        this.additions[index].total += 1
        this.changeAdditions.emit(this.customElementAdditions.value)
        return
      }
    })
  }

  substractAddition(addition: Addition, index) {
    this.customElementAdditions.controls.forEach((ctrl: FormControl) => {
      if (addition.id === ctrl.value.id) {
        ctrl.patchValue({ ...ctrl, total: ctrl.value.total - 1 });
        this.additions[index].total -= 1
        this.changeAdditions.emit(this.customElementAdditions.value)
        return
      }
    })
  }

}
