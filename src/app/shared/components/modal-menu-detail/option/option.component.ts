import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Option } from 'src/app/core/interfaces/restaurant.interface';

@Component({
  selector: 'app-option-component',
  templateUrl: './option.component.html',
  styleUrls: ['./option.component.scss']
})
export class OptionComponent implements OnInit {
  @Input() options: Option[];
  @Output() changeOptions: EventEmitter<FormArray> = new EventEmitter<FormArray> () ;

  public formOptions: FormGroup;
  public arrayValid: any[] = [];

  constructor(
    private fB: FormBuilder
  ) { }

  get customElementOption(): FormArray {
    return this.formOptions.get('options') as FormArray;
  }

  ngOnInit(): void {
    this.formBuilder();
    this.options.forEach((option) => {
      if (option.required) {
        const itemValid = {
          maximum: option.maximum,
          required: option.required,
          select: option.select,
          isValid: false
        }
        this.arrayValid.push(itemValid)
      } else {
        const itemValid = {
          maximum: option.maximum,
          required: option.required,
          select: option.select,
          isValid: true
        }
        this.arrayValid.push(itemValid)
      }
      this.customElementOption.push(new FormGroup({
        active: new FormControl(option.active),
        description: new FormControl(option.description),
        id: new FormControl(option.id),
        items: new FormArray([]),
        maximum: new FormControl(option.maximum),
        required: new FormControl(option.required),
        select: new FormControl(option.select),
        title: new FormControl(option.title)
      }))
    })
    console.log(this.arrayValid);
  }

  private formBuilder() {
    this.formOptions = this.fB.group({
      options: this.fB.array([]),
    })
  }

  addToForm(option, item, index) {
    this.customElementOption.controls.forEach((ctrl: FormControl) => {
      if (ctrl.value.id === option.id) {
        const controlFind = ctrl.get('items') as FormArray;
        controlFind.clear();
        const addItem = this.fB.group({
          id: [item.id, Validators.required],
          image: [item.image, Validators.required],
          name: [item.name, Validators.required],
          price: [item.price, Validators.required]
        })
        controlFind.push(addItem)
      }
    })
    this.changeOptions.emit(this.customElementOption.value)
    this.arrayValid[index] = { ...this.arrayValid[index], isValid: true }
  }

  addToFormCheck(option, item, { checked }) {
    this.customElementOption.controls.forEach((ctrl: FormControl) => {
      if (ctrl.value.id === option.id) {
        const controlFind = ctrl.get('items') as FormArray;
        if (checked) {
          const addItem = this.fB.group({
            id: [item.id, Validators.required],
            image: [item.image, Validators.required],
            name: [item.name, Validators.required],
            price: [item.price, Validators.required]
          })
          controlFind.push(addItem)
          this.changeOptions.emit(this.customElementOption.value)
          return
        } else {
          controlFind.controls.forEach((ctrlItem: FormControl, index) => {
            if (ctrlItem.value.id === item.id) {
              controlFind.removeAt(index);
              this.changeOptions.emit(this.customElementOption.value)    
              return
            }
          })
        }
      }
    })
  }
}
