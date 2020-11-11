import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
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

  getAllBranchesByIdRestaurant(idRestaurant?: string) {
    return this.afs.collection<Branches[]>('RestaurantBranches', ref => ref.where('restaurantId', "==", idRestaurant ))
      .snapshotChanges().pipe(
        map((actions) => actions.map(a => {
          const data = a.payload.doc.data() as Branches;
          const id = a.payload.doc.id;
          return { id, ...data };
        }))
      )
  }

  getBrachesDetail(idBranch: string): Observable<Branches> {
    return this.afs.doc<Branches>('RestaurantBranches/'+ idBranch).valueChanges()
  }

}
