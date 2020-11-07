import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class CategoriesRestaurantsService {

  constructor(
    private afs: AngularFirestore
  ) { }

  getAllCatergories(){
    return this.afs.collection('RestaurantCategories').valueChanges()
  }
}
