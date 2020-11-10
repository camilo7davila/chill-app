import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ModalRestaurantsComponent } from './components/modal-restaurants/modal-restaurants.component';
import { RestaurantsComponent } from './components/restaurants/restaurants.component';

const routes: Routes = [
  {
    path: '',
    component: RestaurantsComponent
  }

  // {
  //   path: '',
  //   component: ModalRestaurantsComponent
  // }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
