import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ModalMenuService } from 'src/app/core/services/modal/modal-menu.service';
import { BranchesM, MenuDatail } from 'src/app/core/interfaces/restaurant.interface';

@Component({
  selector: 'app-footer-modal-component',
  templateUrl: './footer-modal.component.html',
  styleUrls: ['./footer-modal.component.scss']
})
export class FooterModalComponent implements OnInit, OnChanges {
  @Input() mainForm: MenuDatail
  public menu: BranchesM;

  //Seleccion de footer
  public totalPrice: number;
  public quantityTotal: number;
  public valueDish: number;

  //Selecciones del usuario
  public totalOptions: number;
  public totalAdditions: number;

  constructor(
    public modalMenuService: ModalMenuService,
  ) {
    this.totalPrice = 0;
    this.quantityTotal = 1;
    this.valueDish = 0;
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.calcTotalOptions();
    this.calcTotalAdditions();
  }

  ngOnInit(): void {
    this.menu = this.modalMenuService.getIdMenuSelected;
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
    this.totalPrice = ((this.totalOptions + this.valueDish) * this.quantityTotal) + (this.totalAdditions);
  }

}
