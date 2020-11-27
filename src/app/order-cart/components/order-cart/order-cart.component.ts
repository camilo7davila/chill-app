import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';

import { ModalMenuService } from 'src/app/core/services/modal/modal-menu.service';
import { RestaurantsService } from 'src/app/core/services/restaurants/restaurants.service';
import { BranchesRestaurantService } from 'src/app/core/services/restaurants/branches-restaurant.service';

import { forkJoin, Observable } from 'rxjs';
import { CartService } from 'src/app/core/services/cart/cart.service';


@Component({
  selector: 'app-order-cart',
  templateUrl: './order-cart.component.html',
  styleUrls: ['./order-cart.component.scss']
})
export class OrderCartComponent implements OnInit {

  public dataFinal: any[] = [];
  public dataToAddBranche: any[] = []

  public priceTotalPay: number;
  public quantityTotalPay: number;
  public totalData: any[] = [];


  constructor(
    public modalMenuService: ModalMenuService,
    public restaurantsService: RestaurantsService,
    public branchesService: BranchesRestaurantService,
    private cartService: CartService,
    private BRS: BranchesRestaurantService,
  ) {
  }

  ngOnInit(): void {
    const keys = Object.keys(localStorage);
    if(keys.length === 0)  {
      this.dataFinal = []
      return
    }
    let subscriptions: Observable<any>[] = [];
    keys.forEach((key) => {
      subscriptions.push(this.BRS.getBrancheById(key));
    });

    forkJoin(subscriptions)
      .subscribe((data: any[]) => {
        const finalData = data.map((response, index) => {
          response['idBranch'] = keys[index];
          response['request'] = JSON.parse(localStorage.getItem(keys[index]));
          response['totalBranch'] = this.calcRequest(response.request);
          return response
        })
        this.dataFinal = finalData;
      }, err => {
        // console.log(err);
      });


    // Promise.all(subscriptions).then(data => console.log(data)).catch(err => console.log(err));

    // const keys = Object.keys(localStorage);
    // keys.forEach((key) => {
    //   let dataLoca = JSON.parse(localStorage.getItem(key));
    //   this.BRS.getBrancheById(key)
    //   .subscribe(responseBranch => {
    //     const dataToAdd  = {
    //       idBranche: key,
    //       request: dataLoca,
    //       ...responseBranch
    //     };
    //     let countTotal = 0
    //     dataToAdd.request.forEach(element => {
    //       countTotal += element.totalPrice
    //     });
    //     dataToAdd['totalPrice'] = countTotal;
    //     this.data.push(dataToAdd);
    //     console.log(this.data);
    //   })
    // })
  }

  calcRequest(request: any[]): number {
    const sumTotal = (invoiceAmount, nextItem) => invoiceAmount + nextItem.totalPrice;
    let totalBranch = request.reduce(sumTotal, 0);
    return totalBranch
  }

  calcTotal(branches: any[]) {
    const request = branches.map((branch) => branch.request);
    request.forEach((req, index) => {
      const sumTotal = (invoiceAmount, nextItem) => invoiceAmount + nextItem.totalPrice;
      let totalBranch = req.reduce(sumTotal, 0);
      branches[index].totalBranch = totalBranch
    })

    this.dataFinal = branches
    console.log(this.dataFinal);
  }

  deleteCar() {
    console.log('eliminar plato');
    localStorage.removeItem('undefined');
  }
  deleteCarAll() {
    console.log('vaciar todo el carrito');
    localStorage.clear();
    this.ngOnInit();
    this.cartService.changeCart(false)
  }
  total() {
    console.log('pagar total');
  }
}
