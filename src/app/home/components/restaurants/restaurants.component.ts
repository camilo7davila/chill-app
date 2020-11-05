import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Restaurant } from 'src/app/core/interfaces/restaurant.interface';
import { RestaurantsService } from 'src/app/core/services/restaurants/restaurants.service';

@Component({
  selector: 'app-restaurants',
  templateUrl: './restaurants.component.html',
  styleUrls: ['./restaurants.component.scss'],

})
export class RestaurantsComponent implements OnInit {

  public restaurants$ : Observable<Restaurant[]>

  constructor(
    private restaurantsServices: RestaurantsService
  ) { }

  ngOnInit(): void {
    this.restaurants$ = this.restaurantsServices.getAllRestaurants()
  }

  goToUrl(data) {
    console.log(data)
  }
}
