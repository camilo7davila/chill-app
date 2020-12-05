import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { CartService } from 'src/app/core/services/cart/cart.service';

import { firebase } from '@firebase/app'
import '@firebase/auth'
import { AngularFireAuth } from "@angular/fire/auth";

@Component({
  selector: 'app-header-component',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  public totalRequest: number = 0;
  public subscriptionToDestroy$: Subscription

  constructor(
    public authService: AuthService,
    private cartService: CartService,
    private AFA: AngularFireAuth,
  ) { }
  
  ngOnInit(): void {
    this.totalRequest = Object.keys(localStorage).length;
    
    this.subscriptionToDestroy$ = this.cartService.cart$.subscribe((isChange) => {
      console.log('entro');
      this.totalRequest = Object.keys(localStorage).length;
    })
  }

  ngOnDestroy(): void {
    this.subscriptionToDestroy$.unsubscribe();
  }

  closeSesion(){
    firebase.auth().signOut().then(function() {
      // Sign-out successful.
    }).catch(function(error) {
      // An error happened.
    });
  }


}
