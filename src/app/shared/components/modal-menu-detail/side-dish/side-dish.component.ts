import { Component, Input, OnInit, Output,EventEmitter } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Items, SideDish } from "../../../../core/interfaces/restaurant.interface";

@Component({
  selector: 'app-side-dish-component',
  templateUrl: './side-dish.component.html',
  styleUrls: ['./side-dish.component.scss']
})
export class SideDishComponent implements OnInit {

  @Input() sideDishInput: SideDish[];
  @Output() changeSideDish: EventEmitter<SideDish[]> = new EventEmitter<SideDish[]> ();

  public formSideDish: FormGroup;
  public sideDish: SideDish[];
  public sideDishToSend: SideDish[];

  constructor(
    private fB: FormBuilder
  ) { }

  ngOnInit(): void {
    this.sideDish = this.sideDishInput.map((sidedish) => {
      sidedish.items = sidedish.items.map((item) => ({ ...item, total: 0 }))
      return sidedish;
    });
    this.changeSideDish.emit(this.sideDish);
  }

  selectedItem(item: Items, i, j) {
    this.sideDish[i].items[j].total = 1;
    this.changeSideDish.emit(this.sideDish);
  }

  deleteItem(item: Items, i, j) {
    this.sideDish[i].items[j].total = 0;
    this.changeSideDish.emit(this.sideDish);
  }

  substractItem(item: Items, i, j) {
    this.sideDish[i].items[j].total -= 1
    this.changeSideDish.emit(this.sideDish);
  }

  sumItem(item:Items, i,j){
    this.sideDish[i].items[j].total += 1
    this.changeSideDish.emit(this.sideDish);
  }


}
