import { Component, OnInit } from '@angular/core';

import { ShoppingCartService } from 'src/app/core/services/cart/shopping-cart.service';

import { ShoppingCart } from 'src/app/core/interfaces/shopping-cart.interface';

@Component({
  selector: 'app-shoppin-cart',
  templateUrl: './shoppin-cart.component.html',
  styleUrls: ['./shoppin-cart.component.scss']
})
export class ShoppinCartComponent implements OnInit {

  constructor(
    private shoppingCartService: ShoppingCartService,
  ) { }

  ngOnInit(): void {
    // this.shoppingCartService.getAllShoppingCart()
    //   .subscribe(data => {
    //     console.log('shoppingcart', data);
    //   })
  }

}
