import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Branches, BranchesMC,BranchesM } from '../../interfaces/restaurant.interface';

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
    return this.afs.collection<Branches[]>('RestaurantBranches', ref => ref.where('restaurantId', "==", idRestaurant))
      .snapshotChanges().pipe(
        map((actions) => actions.map(a => {
          const data = a.payload.doc.data() as Branches;
          const id = a.payload.doc.id;
          return { id, ...data };
        }))
      )
  }

  getBrachesDetail(idBranch: string): Observable<Branches> {
    return this.afs.doc<Branches>('RestaurantBranches/' + idBranch).valueChanges()

  }

  getBrachesMenuCategories(idBranch: string): Observable<BranchesMC[]> {
    return this.afs.collection<BranchesMC>('RestaurantBranches/' + idBranch + '/MenuCategories').valueChanges()

  }
  getBrachesMenu(idBranch: string): Observable<BranchesM[]> {
    // return this.afs.collection<BranchesM>('RestaurantBranches/' + idBranch + '/Menu').valueChanges()
    return this.afs.collection<BranchesM>('RestaurantBranches/' + idBranch + '/Menu').snapshotChanges()
      .pipe(
        map((actions) => actions.map(a => {
          const data = a.payload.doc.data() as BranchesM;
          const id = a.payload.doc.id;
          return { id, ...data };
        }))
      )
  }


}
