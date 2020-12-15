import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrderCartComponent } from './components/order-cart/order-cart.component';
import { OrdenRequestComponent } from './components/orden-request/orden-request.component';


const routes: Routes = [
  {
    path: '',
    component: OrderCartComponent
  },
   {
     path: 'orden/:id',
    //  path: 'orden',
     component: OrdenRequestComponent
   },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderCartRoutingModule { }
