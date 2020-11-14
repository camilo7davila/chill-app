import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
//Modulos creados
import { HomeRoutingModule } from './home-routing.module';
//Componentes
import { RestaurantsComponent } from './components/restaurants/restaurants.component';
import { CardRestaurantsComponent } from './components/card-restaurants/card-restaurants.component';
import { MaterialModule } from '../material/material.module';
import { CategoriesRestaurantComponent } from './components/categories-restaurant/categories-restaurant.component';
import { CardCategoriesrestaurantComponent } from './components/card-categoriesrestaurant/card-categoriesrestaurant.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    RestaurantsComponent, 
    CardRestaurantsComponent, 
    CategoriesRestaurantComponent, 
    CardCategoriesrestaurantComponent,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MaterialModule,
    SharedModule
  ]
})
export class HomeModule { }
