import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';

import { OrderCartRoutingModule } from './order-cart-routing.module';
import { OrderCartComponent } from './components/order-cart/order-cart.component';
import { OrdenRequestComponent } from './components/orden-request/orden-request.component';


@NgModule({
  declarations: [OrderCartComponent,
    OrdenRequestComponent,
  ],
  imports: [
    CommonModule,
    OrderCartRoutingModule,
    MaterialModule
  ]
})
export class OrderCartModule { }
