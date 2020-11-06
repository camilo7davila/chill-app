import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RestaurantCategoriesRoutingModule } from './restaurant-categories-routing.module';
import { RestaurantCategoriesComponent } from './components/restaurant-categories/restaurant-categories.component';
import { MaterialModule } from '../material/material.module';


@NgModule({
  declarations: [
    RestaurantCategoriesComponent
  ],
  imports: [
    CommonModule,
    RestaurantCategoriesRoutingModule,
    MaterialModule
  ]
})
export class RestaurantCategoriesModule { }
