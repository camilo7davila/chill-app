import { Injectable } from '@angular/core';
import { AngularFirestore } from "@angular/fire/firestore";
import { Restaurant } from '../../interfaces/restaurant.interface';

@Injectable({
  providedIn: 'root'
})
export class RestaurantsService {

  constructor(
    private afs: AngularFirestore
  ) { }

  getAllRestaurants() {
    return this.afs.collection<Restaurant>('Restaurants').valueChanges()
  }

}
