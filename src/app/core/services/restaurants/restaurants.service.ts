import { Injectable } from '@angular/core';
import { AngularFirestore } from "@angular/fire/firestore";
import { Restaurant } from '../../interfaces/restaurant.interface';

import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class RestaurantsService {

  constructor(
    private afs: AngularFirestore
  ) { }

  getAllRestaurants() {
    return this.afs.collection<Restaurant>('Restaurants').snapshotChanges()
      .pipe(
        map((actions) => actions.map(a => {
          const data = a.payload.doc.data() as Restaurant;
          const id = a.payload.doc.id;
          return { id, ...data };
        }))
      )
  }

  getRestaurantById(idRestaurant) {
    return this.afs.doc<Restaurant>('Restaurants/' + idRestaurant).valueChanges()
  }

}
