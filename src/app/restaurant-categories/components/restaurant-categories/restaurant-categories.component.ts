import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { RestaurantsService } from 'src/app/core/services/restaurants/restaurants.service';

@Component({
  selector: 'app-restaurant-categories',
  templateUrl: './restaurant-categories.component.html',
  styleUrls: ['./restaurant-categories.component.scss']
})
export class RestaurantCategoriesComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private restaurantService: RestaurantsService
  ) { }
 
  ngOnInit(): void {
    this.route.params.subscribe(({idRestaurant}) => {
      this.restaurantService.getRestaurantById(idRestaurant).subscribe(data => {
        console.log(data);
      })
    })
  }

}
