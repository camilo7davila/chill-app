import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Restaurant } from 'src/app/core/interfaces/restaurant.interface';
import { RestaurantsService } from 'src/app/core/services/restaurants/restaurants.service';

import {CategoriesRestaurantsService} from 'src/app/core/services/restaurants/categories-restaurants.service'


@Component({
  selector: 'app-restaurants',
  templateUrl: './restaurants.component.html',
  styleUrls: ['./restaurants.component.scss'],

})
export class RestaurantsComponent implements OnInit {

  public restaurants : Restaurant[]=[]

  public Categories : any

  constructor(
    private restaurantsServices: RestaurantsService,
    private categoriesRestaurantCategories : CategoriesRestaurantsService

  ) { }

  ngOnInit(): void {
     this.restaurantsServices.getAllRestaurants().subscribe(restaurant =>{
       this.restaurants = restaurant
       
     })

    this.categoriesRestaurantCategories.getAllCatergories()
      .subscribe(categories => {
        this.Categories =categories
        console.log(this.Categories)
      }) 
  


  }

}
