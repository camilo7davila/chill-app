import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RestaurantCategoriesComponent } from './components/restaurant-categories/restaurant-categories.component';

const routes: Routes = [
  {
    path: ':idRestaurant',
    component:RestaurantCategoriesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RestaurantCategoriesRoutingModule { }
