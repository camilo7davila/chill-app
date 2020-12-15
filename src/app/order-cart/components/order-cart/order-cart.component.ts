import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';

import { ModalMenuService } from 'src/app/core/services/modal/modal-menu.service';
import { RestaurantsService } from 'src/app/core/services/restaurants/restaurants.service';
import { BranchesRestaurantService } from 'src/app/core/services/restaurants/branches-restaurant.service';

import { forkJoin, Observable } from 'rxjs';
import { CartService } from 'src/app/core/services/cart/cart.service';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { ShoppingCartService } from 'src/app/core/services/cart/shopping-cart.service';
import { OrderRequestService } from 'src/app/core/services/cart/order-request.service';
import { ActivatedRoute, Params } from '@angular/router';
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

  public uidUser: string;
  public totalRequestData: any;
  public request: number;

  constructor(
    public modalMenuService: ModalMenuService,
    public restaurantsService: RestaurantsService,
    public branchesService: BranchesRestaurantService,
    private cartService: CartService,
    private BRS: BranchesRestaurantService,
    public authService: AuthService,
    private shoppinCartService: ShoppingCartService,
    private orderRequestService: OrderRequestService,
    private brancheRestaurantService: BranchesRestaurantService,
    private route: ActivatedRoute,
  ) {
  }
  ngOnInit(): void {
    setTimeout(() => {
      this.authService.userIsLogged()
        .then(isLogged => {
          if (isLogged) {
            // console.log(isLogged);
            this.uidUser = isLogged.uid;
            // console.log(this.uidUser);
            // this.shoppinCartService.getdShoppingCartByIdUserTotal('uq0IcW7gRiRHmVIghlGnEGkUKel1')
            this.shoppinCartService.getShoppingCartByIdUserTotal(this.uidUser)
              .subscribe(data => {
                // console.log(data);
                this.totalRequestData = data
                // this.request = this.totalRequestData.dishes.totalPrice
              })
          } else {
          }
        })
    }, 500)
  }

  // calcRequest(request: any[]): number {
  //   const sumTotal = (invoiceAmount, nextItem) => invoiceAmount + nextItem.totalPrice;
  //   let totalBranch = request.reduce(sumTotal, 0);
  //   return totalBranch
  // }

  // calcTotal(branches: any[]) {
  //   const request = branches.map((branch) => branch.request);
  //   request.forEach((req, index) => {
  //     const sumTotal = (invoiceAmount, nextItem) => invoiceAmount + nextItem.totalPrice;
  //     let totalBranch = req.reduce(sumTotal, 0);
  //     branches[index].totalBranch = totalBranch
  //   })
  //   this.dataFinal = branches
  //   console.log(this.dataFinal);
  // }

  // deleteCar() {
  //   console.log('eliminar plato');
  //   localStorage.removeItem('undefined');
  // }
  // deleteCarAll() {
  //   console.log('vaciar todo el carrito');
  //   localStorage.clear();
  //   this.ngOnInit();
  //   this.cartService.changeCart(false)
  // }
  // total() {
  //   console.log('pagar total');
  // }
}

