import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';

import { ModalMenuService } from 'src/app/core/services/modal/modal-menu.service';
import { Branches, MenuDatail } from 'src/app/core/interfaces/restaurant.interface';
import { RestaurantsService } from 'src/app/core/services/restaurants/restaurants.service';
import { BranchesRestaurantService } from 'src/app/core/services/restaurants/branches-restaurant.service';
import { Key } from 'protractor';
import { finished } from 'stream';
import { finalize } from 'rxjs/operators';


@Component({
  selector: 'app-order-cart',
  templateUrl: './order-cart.component.html',
  styleUrls: ['./order-cart.component.scss']
})
export class OrderCartComponent implements OnInit {

  public data: any[];

  public priceTotalPay: number;
  public quantityTotalPay: number;
  public totalData: any[] = [];


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
      this.BRS.getBrancheById(key)
      .subscribe(responseBranch => {
        const dataToAdd = {
          idBranche: key,
          request: data,
          ...responseBranch
        }
        total.push(dataToAdd);
      })
    })

    setTimeout(() => {
      this.data = total
      console.log(total);
      total.length !== 0 && this.calcTotal()
    }, 1000);
  }

  calcTotal() {
    this.data.forEach((data) => {

      let countTotal = 0
      data.request.forEach(element => {
        countTotal += element.totalPrice
      });
      data['totalPrice']= countTotal;
      this.totalData.push(data)
    })
    console.log(this.totalData);
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
