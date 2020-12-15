import { Injectable } from '@angular/core';
import { map } from "rxjs/operators";

import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore } from "@angular/fire/firestore";

@Injectable({
  providedIn: 'root'
})
export class OrderRequestService {

  constructor(
    private AFA: AngularFireAuth,
    private afs: AngularFirestore
  ) { }

  getAllOrderRequest() {
    return this.afs.collection<any>('OrderRequest').snapshotChanges()
      .pipe(
        map((actions) => actions.map(a => {
          const data = a.payload.doc.data() as any;
          const id = a.payload.doc.id;
          return { id, ...data };
        }))
      )
  }

  createOrderRequestId(idOrder, data) {
    return this.afs.doc(`OrderRequest/${idOrder}`).set(data)
  }
}
