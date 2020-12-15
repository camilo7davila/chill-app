import { Injectable } from '@angular/core';
import { map } from "rxjs/operators";

import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore } from "@angular/fire/firestore";

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor(
    private AFA: AngularFireAuth,
    private afs: AngularFirestore
  ) { }

  getShoppingCartByIdUser(uid, idBranch) {
    return this.afs.doc(`Users/${uid}/ShoppingCart/${idBranch}`).valueChanges()
  }

  // getShoppingCartByIdUser(uid, idBranch) {
  //   return this.afs.collection(`Users/${uid}/ShoppingCart/${idBranch}`).snapshotChanges()
  //     .pipe(
  //       map((actions) => actions.map(a => {
  //         const data = a.payload.doc.data() as any;
  //         const id = a.payload.doc.id;
  //         return { id, ...data };
  //       }))
  //     )
  // }

  createShoppingCart(uid, idBranch, data) {
    return this.afs.doc(`Users/${uid}/ShoppingCart/${idBranch}`).set(data)
  }

  newDishesShoppingCart(uid, idBranch, data) {
    return this.afs.doc(`Users/${uid}/ShoppingCart/${idBranch}`).set(data)
  }

  // getShoppingCartByIdUserTotal(uid) {
  //   return this.afs.collection(`Users/${uid}/ShoppingCart`).valueChanges()
  // }

  getShoppingCartByIdUserTotal(uid) {
    return this.afs.collection<any>(`Users/${uid}/ShoppingCart`).snapshotChanges()
      .pipe(
        map((actions) => actions.map(a => {
          const data = a.payload.doc.data() as any;
          const id = a.payload.doc.id;
          return { id, ...data };
        }))
      )
  }

  // getAllShoppingCart() {
  //   return this.afs.collection<ShoppingCart>('ShoppingCart').snapshotChanges()
  //     .pipe(
  //       map((actions) => actions.map(a => {
  //         const data = a.payload.doc.data() as ShoppingCart;
  //         const id = a.payload.doc.id;
  //         return { id, ...data };
  //       }))
  //     )
  // }


}
