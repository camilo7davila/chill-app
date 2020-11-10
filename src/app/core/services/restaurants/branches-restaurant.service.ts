import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map, tap } from 'rxjs/operators';
import { Branches } from '../../interfaces/restaurant.interface';

@Injectable({
  providedIn: 'root'
})
export class BranchesRestaurantService {
  constructor(
    private afs: AngularFirestore
  ) { }

  getAllBranchesId() {
    return this.afs.collection<Branches>('RestaurantBranches').snapshotChanges()
      .pipe(
        map((actions) => actions.map(a => {
          const data = a.payload.doc.data() as Branches;
          const id = a.payload.doc.id;
          return { id, ...data };
        }))
      )
  }

  getAllBranches(idRestaurant?: string){
    return this.afs.collection('RestaurantBranches', ref => ref.where('restaurantId', "==", 'idRestaurant' )).valueChanges();
  }


}
