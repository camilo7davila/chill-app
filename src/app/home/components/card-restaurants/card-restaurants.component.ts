import { Component, OnInit, Input } from '@angular/core';
import { Restaurant } from 'src/app/core/interfaces/restaurant.interface';

@Component({
  selector: 'app-card-restaurants',
  templateUrl: './card-restaurants.component.html',
  styleUrls: ['./card-restaurants.component.scss']
})
export class CardRestaurantsComponent implements OnInit {

  @Input () restaurant1: Restaurant;
  
  
  constructor() { }

  ngOnInit(): void { 
  }
}
