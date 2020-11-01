import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
//Modulos creados
import { HomeRoutingModule } from './home-routing.module';
//Componentes
import { RestaurantsComponent } from './components/restaurants/restaurants.component';
import { CardRestaurantsComponent } from './components/card-restaurants/card-restaurants.component';
import { MaterialModule } from '../material/material.module';


@NgModule({
  declarations: [
    RestaurantsComponent, 
    CardRestaurantsComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MaterialModule,
  ]
})
export class HomeModule { }
