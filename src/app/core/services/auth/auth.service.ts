import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";

import { AngularFirestore } from "@angular/fire/firestore";
import { User } from '../../interfaces/restaurant.interface';

import { map } from "rxjs/operators";



@Injectable({ providedIn: 'root' })
export class AuthService {

  private userLogged: string;
  private userUid: string;

  get currentUser() { return this.userLogged }
  get currentUserUid() { return this.userUid }

  get windowRef() { return window }

  constructor(
    private AFA: AngularFireAuth,
    private afs: AngularFirestore
  ) { }

  loginUser(email, password) {
    return this.AFA.signInWithEmailAndPassword(email, password)
  }

  registerUser(email, password) {
    return this.AFA.createUserWithEmailAndPassword(email, password)
  }

  userIsLogged() {
    return this.AFA.currentUser
  }

  setCurrentUser(email, uid) {
    this.userLogged = email;
    this.userUid = uid
  }

  guardUser() {
    return this.AFA.currentUser
  }
  // updateProfilUser() {
  //   return this.AFA.updateCurrentUser()
  // }

  getAllUser() {
    return this.afs.collection<User>('Users').snapshotChanges()
      .pipe(
        map((actions) => actions.map(a => {
          const data = a.payload.doc.data() as User;
          const id = a.payload.doc.id;
          return { id, ...data };
        }))
      )
  }

  getUserById(uid) {
    return this.afs.doc<any>('Users/' + uid).valueChanges()
  }

  registerUserInDB(uid, user) {
    return this.afs.doc('Users/' + uid).set(user)
  }

  // registerUserInDB(uid) {
  //   return this.afs.doc('Users/'+ uid)
  // }




  // async loginGoogle(): Promise<User> {
  //   try {
  //     const { user } = await this.AFA.signInWithPopup(
  //       new auth.GoogleAuthProvider()
  //     );
  //     this.updateUserData(user);
  //     return user;
  //   } catch (error) {
  //     console.log(error);
  // }

  getStatus() {
    return this.AFA.authState;
  }

}
