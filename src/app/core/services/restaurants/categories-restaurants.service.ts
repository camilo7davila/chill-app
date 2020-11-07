import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { Categories } from '../../interfaces/restaurant.interface';

@Injectable({
  providedIn: 'root'
})
export class CategoriesRestaurantsService {

  constructor(
    private afs: AngularFirestore
  ) { }

  getAllCatergories(){
    return this.afs.collection<Categories>('RestaurantCategories').snapshotChanges()
    .pipe(
      map((actions) => actions.map(a => {
        const data = a.payload.doc.data() as Categories;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    )
  }
}
