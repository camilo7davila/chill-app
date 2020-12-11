import { Injectable } from '@angular/core';

import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore } from "@angular/fire/firestore";
import { OrderRequest } from '../../interfaces/orden-request.interface';
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class OrdenRequestService {

  constructor(
    private AFA: AngularFireAuth,
    private afs: AngularFirestore
  ) { }

  getAllOrderRequest() {
    return this.afs.collection<OrderRequest>('OrderRequest').snapshotChanges()
      .pipe(
        map((actions) => actions.map(a => {
          const data = a.payload.doc.data() as OrderRequest;
          const id = a.payload.doc.id;
          return { id, ...data };
        }))
      )
  }
}
