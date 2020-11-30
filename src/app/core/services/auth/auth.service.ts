import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";

@Injectable({ providedIn: 'root' })
export class AuthService {

  private userLogged: string;
  private userUid: string;

  get currentUser() { return this.userLogged }
  get currentUserUid() { return this.userUid }

  constructor(
    private AFA: AngularFireAuth
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

  get windowRef() {
    return window;
  }
}
