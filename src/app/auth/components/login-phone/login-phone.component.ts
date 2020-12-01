import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth/auth.service';
// import * as firebase from 'firebase';

import { firebase } from '@firebase/app'
import '@firebase/auth'

import { AngularFireAuth } from "@angular/fire/auth";
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login-phone',
  templateUrl: './login-phone.component.html',
  styleUrls: ['./login-phone.component.scss']
})
export class LoginPhoneComponent implements OnInit, AfterViewInit {
  change: boolean = false;
  windowRef: any;

  phoneNumber: string;
  otp: string;
  phoneSingIn = true;
  disableButton = false;
  public phoneForm: FormGroup;
  public isFirstStep: boolean;

  constructor(
    private authService: AuthService,
    private fB: FormBuilder,
    private AFA: AngularFireAuth
  ) {
    this.isFirstStep = true;
    // this.windowRef = authService.windowRef
  }

  ngOnInit(): void {
    this.buildForm();
    this.windowRef = this.authService.windowRef
    firebase.initializeApp(environment.fire);
  }

  ngAfterViewInit(): void {
    this.windowRef.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container', {
      // 'size': 'normal',
      'size': 'invisible',
      'callback': function (response) {
        this.disableButton = true
      }
    })
    this.windowRef.recaptchaVerifier.render();
  }

  send() {
    this.AFA.signInWithPhoneNumber('+57' +this.phoneForm.get('phone').value, this.windowRef.recaptchaVerifier)
      .then((confirmationResult) => {
        console.log(confirmationResult);
        this.isFirstStep = false
        this.windowRef.confirmationResult = confirmationResult;
      })
      .catch(err => console.log('ocurrio un error' , err))
  }

  verify() {
    this.windowRef.confirmationResult.confirm(this.otp)
  }

  togglePhoneSingIn() {
    this.phoneSingIn = !this.phoneSingIn;
  }

  private buildForm() {
    this.phoneForm = this.fB.group({
      phone: ['', [Validators.min(3000000000), Validators.max(3999999999)]]
    })
  }

}
