import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Branches, Restaurant } from 'src/app/core/interfaces/restaurant.interface';

@Component({
  selector: 'app-modal-restaurants-components',
  templateUrl: './modal-restaurants.component.html',
  styleUrls: ['./modal-restaurants.component.scss']
})
export class ModalRestaurantsComponent implements OnInit, OnDestroy {

  @Input () restaurantModal: string;

  @Output() restaurantX : EventEmitter<any> = new EventEmitter();

  public restaurantsbranches: Branches[] = [];

  constructor(
    
  ) { }
  ngOnDestroy(): void {
    console.log('componente se destryu')
  }

  ngOnInit(): void {
    // this.restaurantsServices.getAllRestaurants()
    //   .subscribe(restaurant => {
    //     this.restaurants = restaurant
    //   })
    console.log('desde hijo pasa esto =>',this.restaurantModal);
    
  }

  restaurantModalX(){
    // this.restaurantClick.emit('Este dato viajará hacia el padre');
    this.restaurantX.emit( );
    // console.log(this.restaurant1);
  }

}
