import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';

import { ModalMenuService } from 'src/app/core/services/modal/modal-menu.service';
import { Branches, MenuDatail } from 'src/app/core/interfaces/restaurant.interface';
import { RestaurantsService } from 'src/app/core/services/restaurants/restaurants.service';
import { BranchesRestaurantService } from 'src/app/core/services/restaurants/branches-restaurant.service';
import { Key } from 'protractor';


@Component({
  selector: 'app-order-cart',
  templateUrl: './order-cart.component.html',
  styleUrls: ['./order-cart.component.scss']
})
export class OrderCartComponent implements OnInit {

  public data: any

  public priceTotalPay: number;
  public quantityTotalPay: number;


  constructor(
    public modalMenuService: ModalMenuService,

    public restaurantsService: RestaurantsService,

    public branchesService: BranchesRestaurantService,

    private BRS: BranchesRestaurantService,
  ) {
  }

  ngOnInit(): void {

    const keys = Object.keys(localStorage);
    const total = []
    keys.forEach((key) => {
      let data = JSON.parse(localStorage.getItem(key));

      const dataToAdd = {
        idBranche: key,
        request: data
      }
      this.data = total
      total.push(dataToAdd)
      console.log('pedido total',this.data);
      // this.BRS.getAllBranchesId().subscribe(data => console.log('sucursales', data))

    // this.priceTotalPay = 0;
    // const { totalPrice } = this.data;
    // const sumTotalPrice = (invoiceAmount, nextTotalPrice) => invoiceAmount + nextTotalPrice;
    // this.priceTotalPay = totalPrice.reduce(sumTotalPrice, 0);
    // console.log('totalprice',this.priceTotalPay); 

    // this.quantityTotalPay = 0;
    // const { quantityTotal } = this.data;
    // const sumQuantityTotal = (invoiceAmount, nextTotalQuantity) => invoiceAmount + nextTotalQuantity;
    // this.quantityTotalPay = quantityTotal.reduce(sumQuantityTotal, 0);
    // console.log('totalquantity ',this.quantityTotalPay); 
      
    })

  }

  deleteCar() {
    console.log('eliminar plato');
    localStorage.removeItem('undefined');
  }
  deleteCarAll() {
    console.log('vaciar todo el carrito');
    localStorage.clear();
  }
  total() {
    console.log('pagar total');
  }
}
