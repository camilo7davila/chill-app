import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';

import { OrderCartRoutingModule } from './order-cart-routing.module';
import { OrderCartComponent } from './components/order-cart/order-cart.component';
import { OrdenRequestComponent } from './components/orden-request/orden-request.component';
import { ShoppinCartComponent } from './components/shoppin-cart/shoppin-cart.component';


@NgModule({
  declarations: [OrderCartComponent,
    OrdenRequestComponent,
    ShoppinCartComponent],
  imports: [
    CommonModule,
    OrderCartRoutingModule,
    MaterialModule
  ]
})
export class OrderCartModule { }
