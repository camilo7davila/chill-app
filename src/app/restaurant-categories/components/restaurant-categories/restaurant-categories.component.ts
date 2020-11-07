import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { RestaurantsService } from 'src/app/core/services/restaurants/restaurants.service';

import { Restaurant } from 'src/app/core/interfaces/restaurant.interface';

@Component({
  selector: 'app-restaurant-categories',
  templateUrl: './restaurant-categories.component.html',
  styleUrls: ['./restaurant-categories.component.scss']
})
export class RestaurantCategoriesComponent implements OnInit {

  public restaurantscategorie : Restaurant[]=[]


  constructor(
    private route: ActivatedRoute,
    private restaurantService: RestaurantsService,
    private restaurantscServices: RestaurantsService
  ) { }
 
  ngOnInit(): void {
    this.route.params.subscribe(({idRestaurant}) => {
      this.restaurantService.getRestaurantById(idRestaurant).subscribe(data => {
        console.log(data);
      })
    })

    this.restaurantscServices.getAllRestaurants().subscribe(restaurant =>{
      this.restaurantscategorie = restaurant
      console.log(this.restaurantscategorie);
    })
  




  }

}
