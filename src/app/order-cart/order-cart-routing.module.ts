import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrderCartComponent } from './components/order-cart/order-cart.component';
import { OrdenRequestComponent } from './components/orden-request/orden-request.component';
import { ShoppinCartComponent } from './components/shoppin-cart/shoppin-cart.component';


const routes: Routes = [
  {
    path: '',
    component: OrderCartComponent
  },
   {
     path: 'orden',
     component: OrdenRequestComponent
   },
  {
    path: 'shopping',
    component: ShoppinCartComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderCartRoutingModule { }
