import { Component, OnInit } from '@angular/core';

import { OrdenRequestService } from 'src/app/core/services/orden-request/orden-request.service';

import { OrderRequest } from 'src/app/core/interfaces/orden-request.interface';
import { ActivatedRoute, Params } from '@angular/router';
import { ShoppingCartService } from 'src/app/core/services/cart/shopping-cart.service';
import { OrderRequestService } from 'src/app/core/services/cart/order-request.service';
import { AuthService } from 'src/app/core/services/auth/auth.service';


@Component({
  selector: 'app-orden-request',
  templateUrl: './orden-request.component.html',
  styleUrls: ['./orden-request.component.scss']
})
export class OrdenRequestComponent implements OnInit {
  public ordenrequest: OrderRequest[] = [];
  public dataForm: any;
  public idShopping: string;

  public uidUser: string;
  public UserLogin: any;

  constructor(
    private ordenRequestService: OrdenRequestService,
    private route: ActivatedRoute,
    private shoppinCartService: ShoppingCartService,
    private orderRequestService: OrderRequestService,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
  }

  addOrder() {
    this.route.params.subscribe(params => {
      // console.log(params.id);
      this.idShopping = params.id
    })
    this.authService.userIsLogged()
      .then(isLogged => {
        if (isLogged) {
          // console.log(isLogged);
          this.uidUser = isLogged.uid;
          // console.log(this.uidUser);
          this.authService.getUserById(this.uidUser).subscribe(data => {
            // console.log(data);
            this.UserLogin = data
            // console.log(this.UserLogin);
          })
          this.shoppinCartService.getShoppingCartByIdUser(this.uidUser, this.idShopping)
            .subscribe(data => {
              this.dataForm = data
              // console.log(data);
              const orderForm = {
                bill: {
                  payBy: '0',
                  payTo: '0',
                  paymentMethod: '10',
                  subTotal: '100000',
                  tip: '0',
                  totalOrder: '100000',
                  totalPaid: '0',
                },
                dishes: this.dataForm.dishes,
                order: {
                  dateRequested: '---',
                  experience: '0',
                  orderNumber: 'WJDA7',
                  table: {
                    code: 'WWJJDD',
                    id: '---',
                    name: '',
                    number: '12',
                    url: '',
                  }
                },
                orderState: '2',
                restaurant: this.dataForm.restaurant,
                user: this.UserLogin,
              }
              var d = new Date().getTime();
              var uuid = 'xxxxxxxxxxxx4xxxyxxx'.replace(/[xy]/g, function (c) {
                var r = (d + Math.random() * 16) % 16 | 0;
                d = Math.floor(d / 16);
                return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
              });
              // console.log(uuid);
              this.orderRequestService.createOrderRequestId(uuid, orderForm)
                .then((result) => console.log(result))
                .catch((err) => console.log(err))
            })
        } else {
        }
      })

  }

}
