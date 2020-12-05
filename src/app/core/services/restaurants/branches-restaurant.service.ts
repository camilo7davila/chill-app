import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';
import { Branches, BranchesMC, BranchesM, MenuDatail } from '../../interfaces/restaurant.interface';

@Injectable({ providedIn: 'any' })
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
    // return this.afs.collection<BranchesMC>('RestaurantBranches/' + idBranch + '/MenuCategories', ref => ref.orderBy('main')).valueChanges()
    return this.afs.collection<BranchesMC>('RestaurantBranches/' + idBranch + '/MenuCategories', ref => ref.orderBy('main')).snapshotChanges()
    .pipe(
      map((actions) => actions.map( a => {
        const data = a.payload.doc.data() as BranchesMC;
        const id = a.payload.doc.id;
        return { id, ...data};
      }))
    )

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

  getAllMenusByIdMenu(idBranch: string, idMenu: string) {
    return this.afs.collection<MenuDatail[]>('RestaurantBranches/' + idBranch + '/Menu/' + idMenu + '/MenuData')
      .snapshotChanges().pipe(
        map((actions) => actions.map(a => {
          const data = a.payload.doc.data() as MenuDatail;
          const id = a.payload.doc.id;
          return { id, ...data };
        }))
      )
  }

  getBrancheById(idBranch) {
    return this.afs.doc<any>('RestaurantBranches/' + idBranch).valueChanges().pipe(
      take(1)
    )
  }


  getCategorieById(idBranch, idCategorie) {
    return this.afs.collection<BranchesMC>('RestaurantBranches/' + idBranch + '/MenuCategories' + idCategorie).valueChanges()
  }





}
