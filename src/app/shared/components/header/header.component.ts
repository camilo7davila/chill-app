import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { CartService } from 'src/app/core/services/cart/cart.service';

import { firebase } from '@firebase/app'
import '@firebase/auth'
import { AngularFireAuth } from "@angular/fire/auth";

import { ShoppingCartService } from 'src/app/core/services/cart/shopping-cart.service';
import { ModalMenuService } from 'src/app/core/services/modal/modal-menu.service';

@Component({
  selector: 'app-header-component',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  public totalRequest: number = 0;
  public subscriptionToDestroy$: Subscription;

  public User: string;
  public uidUser: string;

  public UserLogin: any;


  constructor(
    public authService: AuthService,
    private cartService: CartService,
    private AFA: AngularFireAuth,
    private shoppinCartService: ShoppingCartService,
    public modalMenuService: ModalMenuService,
  ) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.authService.userIsLogged()
        .then(isLogged => {
          if (isLogged) {
          // console.log(isLogged);
          this.uidUser = isLogged.uid;
          // console.log(this.uidUser);
          this.shoppinCartService.getShoppingCartByIdUserTotal(this.uidUser)
            // this.shoppinCartService.getShoppingCartByIdUserTotal('uq0IcW7gRiRHmVIghlGnEGkUKel1')
            .subscribe(total =>
              this.totalRequest = total.length
              //  console.log(total.length)
            )
          this.authService.getUserById(this.uidUser).subscribe(data => {
            // console.log(data);
            this.UserLogin = data
            // console.log(this.UserLogin);
          })
        } else {
        }
        })


        .catch((e) => console.log(e))
    }, 500)
  }
  ngOnDestroy(): void {
    // this.subscriptionToDestroy$.unsubscribe();
  }
  closeSesion() {
    firebase.auth().signOut().then(function () {
      // Sign-out successful.
    }).catch(function (error) {
      // An error happened.
    });
  }
}
