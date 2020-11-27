import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

import { ActivatedRoute, Params } from '@angular/router';

import { ModalMenuService } from 'src/app/core/services/modal/modal-menu.service';
import { BranchesM, MenuDatail } from 'src/app/core/interfaces/restaurant.interface';

@Component({
  selector: 'app-footer-modal-component',
  templateUrl: './footer-modal.component.html',
  styleUrls: ['./footer-modal.component.scss']
})
export class FooterModalComponent implements OnInit, OnChanges {
  @Input() mainForm: MenuDatail;
  
  public menu: BranchesM;

  //Seleccion de footer
  public totalPrice: number;
  public quantityTotal: number;
  public valueDish: number;

  //Selecciones del usuario
  public totalOptions: number;
  public totalAdditions: number;
  public totalSideDish: number;

  constructor(
    private route: ActivatedRoute,
    public modalMenuService: ModalMenuService,
  ) {
    this.totalPrice = 0;
    this.quantityTotal = 1;
    this.valueDish = 0;
    
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.calcTotalOptions();
    this.calcTotalAdditions();
    this.calcTotalSideDish();
    this.mainForm.idBranch = this.modalMenuService.getIdBranch
  }

  ngOnInit(): void {
    this.menu = this.modalMenuService.getIdMenuSelected;
    // console.log(this.menu)
    this.totalPrice = this.menu.price;
    this.valueDish = this.menu.price;
  }

  //Metodos que vienen cuando cambia formulario
  calcTotalOptions() {
    this.totalOptions = 0;
    const { options } = this.mainForm;
    const items = options.map(option => option.items);
    if (items.length === 0) {
      this.calcTotal();
      return
    }
    let joinItems = items.reduce((a, b) => a.concat(b));
    const sumItems = (invoiceAmount, nextItem) => invoiceAmount + nextItem.price;
    this.totalOptions = joinItems.reduce(sumItems, 0);
    this.calcTotal();
  }

  calcTotalAdditions() {
    this.totalAdditions = 0;
    const { additions } = this.mainForm;
    if (additions.length === 0) {
      this.calcTotal();
      return;
    }
    const sumAdditions = (invoiceAmount, nextAddition) => invoiceAmount + (nextAddition.total * nextAddition.price);
    this.totalAdditions = additions.reduce(sumAdditions, 0);
    this.calcTotal()
  }

  calcTotalSideDish() {
    this.totalSideDish = 0;
    const { sideDish } = this.mainForm;
    const items = sideDish.map(side => side.items);
    if (items.length === 0) {
      this.calcTotal();
      return
    }
    let joinItems = items.reduce((a, b) => a.concat(b));
    const sumItems = (invoiceAmount, nextItem) => invoiceAmount + (nextItem.price * nextItem.total);
    this.totalSideDish = joinItems.reduce(sumItems, 0);
    this.calcTotal();
  }


  //Metodos cambio de quantityDish
  changeQuantityDishes(type: 'resta' | 'suma') {
    if (type === 'resta') {
      this.quantityTotal -= 1;
    } else {
      this.quantityTotal += 1;
    }
    this.calcTotal();
  }

  calcTotal() {
    this.totalPrice = ((this.totalOptions + this.valueDish) * this.quantityTotal) + (this.totalAdditions) + (this.totalSideDish);
  }

  addCart() {

    this.mainForm.totalPrice = this.totalPrice;
    this.mainForm.quantityTotal = this.quantityTotal;
    this.mainForm.nameMenu = this.menu.name || '';
    this.mainForm.imagenMenu = this.menu.mainImage || this.menu.image;
    
    let dataInStorage: any[] = JSON.parse(localStorage.getItem(this.mainForm.idBranch)) || [];
    
    if (dataInStorage.length !== 0) {
      dataInStorage.push(this.mainForm)
      localStorage.setItem(this.mainForm.idBranch, JSON.stringify(dataInStorage));
    } else {
      dataInStorage.push(this.mainForm)
      localStorage.setItem(this.mainForm.idBranch, JSON.stringify(dataInStorage));
    }
  }
}
