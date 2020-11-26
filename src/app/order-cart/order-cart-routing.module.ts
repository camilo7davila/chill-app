import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrderCartComponent } from './components/order-cart/order-cart.component';


const routes: Routes = [
  {
    path: '',
    component: OrderCartComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderCartRoutingModule { }
