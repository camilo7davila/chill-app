import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { BranchesM, MenuDatail } from 'src/app/core/interfaces/restaurant.interface';

import { ModalMenuService } from 'src/app/core/services/modal/modal-menu.service';

import { BranchesRestaurantService } from 'src/app/core/services/restaurants/branches-restaurant.service';

@Component({
  selector: 'app-modal-menu-detail',
  templateUrl: './modal-menu-detail.component.html',
  styleUrls: ['./modal-menu-detail.component.scss']
})
export class ModalMenuDetailComponent implements OnInit {
  public menuFound: BranchesM[] = [];
  public idBranch: string;
  public menu: BranchesM;
  public menuData: MenuDatail[] = [];
  public mainForm: FormGroup;

  get customArray(): FormArray {
    return this.mainForm.get('customizations') as FormArray;
  }

  get optionArray(): FormArray {
    return this.mainForm.get('options') as FormArray;
  }

  get additionArray(): FormArray {
    return this.mainForm.get('additions') as FormArray;
  }


  constructor(
    public modalMenuService: ModalMenuService,
    public branchesService: BranchesRestaurantService,
    public fB: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.idBranch = this.modalMenuService.getIdBranch;
    this.menu = this.modalMenuService.getIdMenuSelected;
    this.branchesService.getAllMenusByIdMenu(this.idBranch, this.menu.id)
      .subscribe(data => {
        this.menuData = data;
      })
    this.formBuilder();
  }

  private formBuilder() {
    this.mainForm = this.fB.group({
      customizations: this.fB.array([]),
      options: this.fB.array([]),
      additions: this.fB.array([])
    })
  }

  //Customization
  changeCustomization(custom: []) {
    this.customArray.clear();
    custom.forEach((customItem) => {
      this.customArray.push(new FormControl(customItem));
    })
  }

  //Options

}
