import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Restaurant } from 'src/app/core/interfaces/restaurant.interface';

@Component({
  selector: 'app-card-restaurants',
  templateUrl: './card-restaurants.component.html',
  styleUrls: ['./card-restaurants.component.scss']
})
export class CardRestaurantsComponent implements OnInit {
 
  @Input () restaurant1: Restaurant;
  @Output() restaurantClick: EventEmitter<any> = new EventEmitter();

  
  constructor() { }

  ngOnInit(): void { 

  }
  restaurantSelect(){
    // this.restaurantClick.emit('Este dato viajará hacia el padre');
    this.restaurantClick.emit(this.restaurant1.id);
    // console.log(this.restaurant1);
  }


}
