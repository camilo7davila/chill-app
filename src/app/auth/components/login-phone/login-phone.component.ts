import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth/auth.service';
// import * as firebase from 'firebase';

import { firebase } from '@firebase/app'
import '@firebase/auth'

import { AngularFireAuth } from "@angular/fire/auth";

@Component({
  selector: 'app-login-phone',
  templateUrl: './login-phone.component.html',
  styleUrls: ['./login-phone.component.scss']
})
export class LoginPhoneComponent implements OnInit, AfterViewInit {
  phoneForm: FormGroup;
  change: boolean = false;
  windowRef: any;

  phoneNumber: string;
  otp: string;
  phoneSingIn = true;
  disableButton = true

  constructor(
    private authService: AuthService,
    private fB: FormBuilder,
    private AFA: AngularFireAuth
  ) {
    // this.windowRef = authService.windowRef
  }

  ngOnInit(): void {
    this.windowRef = this.authService.windowRef
  }

  ngAfterViewInit(): void {
    this.windowRef.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container', {
      'size': 'normal',
      'callback': function (response) {
        this.disableButton = true
      }
    });
    this.windowRef.recaptchaVerifier.render();
  }
  send() {
    return this.AFA.signInWithPhoneNumber(this.phoneNumber, this.windowRef.recaptchaVerifier)
      .then((confirmationResult) => {
        this.windowRef.confirmationResult = confirmationResult;
      })
  }
  verify() {
    this.windowRef.confirmationResult.confirm(this.otp)
  }

  togglePhoneSingIn() {
    this.phoneSingIn = !this.phoneSingIn;

  }

}
