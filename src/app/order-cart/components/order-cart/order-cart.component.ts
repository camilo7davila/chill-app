import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';

import { ModalMenuService } from 'src/app/core/services/modal/modal-menu.service';
import { Branches, MenuDatail } from 'src/app/core/interfaces/restaurant.interface';
import { RestaurantsService } from 'src/app/core/services/restaurants/restaurants.service';
import { BranchesRestaurantService } from 'src/app/core/services/restaurants/branches-restaurant.service';

import { forkJoin, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';


@Component({
  selector: 'app-order-cart',
  templateUrl: './order-cart.component.html',
  styleUrls: ['./order-cart.component.scss']
})
export class OrderCartComponent implements OnInit {

  public data: any[] = [];
  public dataToAddBranche :any[]=[]

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
    // const keys = Object.keys(localStorage);
    // // console.log(keys);
    // let subscriptions: Observable<any>[] = [];
    // keys.forEach((key) => {
    //   subscriptions.push(this.BRS.getBrancheById(key));
    // });
    // // console.log(subscriptions);
    // const join = forkJoin(subscriptions);
    // // Promise.all(subscriptions).then(data => console.log(data)).catch(err => console.log(err));
    
    // join.subscribe((data: any[]) => {
    //   console.log('entro', data);
    // }, err => {
    //   // console.log(err);
    // });

    const keys = Object.keys(localStorage);
    keys.forEach((key) => {
      let data = JSON.parse(localStorage.getItem(key));
      this.BRS.getBrancheById(key)
      .subscribe(responseBranch => {
        const dataToAdd  = {
          idBranche: key,
          request: data,
          ...responseBranch
        };
        let countTotal = 0
        dataToAdd.request.forEach(element => {
          countTotal += element.totalPrice
        });
        dataToAdd['totalPrice'] = countTotal;
        console.log(dataToAdd);
        this.data.push(dataToAdd);
      })
      // console.log(data);
    })
  }
  
  // calcTotal() {
  //   this.data.forEach((data) => {
  //     let countTotal = 0
  //     data.request.forEach(element => {
  //       countTotal += element.totalPrice
  //     });
  //     data['totalPrice']= countTotal;
  //     this.totalData.push(data)
  //   })
  //   console.log(this.totalData);
  // }

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
