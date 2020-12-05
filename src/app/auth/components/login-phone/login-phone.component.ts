import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { Router } from '@angular/router';

import { firebase } from '@firebase/app'
import '@firebase/auth'
import { AngularFireAuth } from "@angular/fire/auth";

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
  public codeForm: FormGroup;
  public googleForm: FormGroup;
  public isFirstStep: boolean;

  constructor(
    private authService: AuthService,
    private fB: FormBuilder,
    private AFA: AngularFireAuth,
    private router: Router,

  ) {
    this.isFirstStep = true;
  }

  ngOnInit(): void {
    this.buildForm();
    this.windowRef = this.authService.windowRef;
    // firebase.initializeApp(environment.fire);
    this.codeForm.valueChanges.subscribe(form => {
      this.changeFocus(form)
    })
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
    this.AFA.signInWithPhoneNumber('+57' + this.phoneForm.get('phone').value, this.windowRef.recaptchaVerifier)
      .then((confirmationResult) => {
        console.log(confirmationResult);
        this.isFirstStep = false
        this.windowRef.confirmationResult = confirmationResult;
      })
      .catch(err => console.log('ocurrio un error', err))
  }

  verify(codeForm: FormGroup) {
    let code1 = codeForm.get('code1').value;
    let code2 = codeForm.get('code2').value;
    let code3 = codeForm.get('code3').value;
    let code4 = codeForm.get('code4').value;
    let code5 = codeForm.get('code5').value;
    let code6 = codeForm.get('code6').value;
    let code: string = code1 + "" + code2 + "" + code3 + "" + code4 + "" + code5 + "" + code6;
    console.log(code, typeof code)

    if (this.codeForm.invalid) {
    } else {
      this.windowRef.confirmationResult.confirm(code)
        .then((result) => {
          const user = result.user;
          const uid = user.uid;
          this.authService.getUserById(uid).subscribe((user) => {
            if (user) {
              console.log('user existe =>', user);
              this.router.navigate(['/sucursal/' + sessionStorage.getItem('urlUser')])
              // this.router.navigate(['/home'])
            } else {
              console.log('usuario indefinido redireccionar a form de register =>', user);
              this.router.navigate(['/auth/register-data'], { queryParams: { uid: uid, provider: 'phone', phone: this.phoneForm.get('phone').value } })
            }
          })
        })
        .catch(function (error) {
          // User couldn't sign in (bad verification code?)
          // ...
          console.log('error', error);
        });
    }
  }

  verifygoogle(googleForm: FormGroup) {
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider)
    .then((result) => {
      const user = result.user;
          const uid = user.uid;
          this.authService.getUserById(uid).subscribe((user) => {
            if (user) {
              console.log('user existe =>', user);
              this.router.navigate(['/sucursal/' + sessionStorage.getItem('urlUser')])
              // this.router.navigate(['/home'])
            } else {
              console.log('usuario indefinido redireccionar a form de register =>', user);
              this.router.navigate(['/auth/register-data'], { queryParams: { uid: uid, provider: 'google' } })
            }
          })
        })
      .catch(function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      var email = error.email;
      var credential = error.credential;
    });
  }

  verifyfacebook(){
    var provider = new firebase.auth.FacebookAuthProvider();
    provider.addScope('user_birthday');
    provider.addScope('public_profile');

    firebase.auth().languageCode = 'fr_FR';
    provider.setCustomParameters({
      'display': 'popup'
    });

    firebase.auth().signInWithPopup(provider)
    .then((result) => {
      const user = result.user;
          const uid = user.uid;
          this.authService.getUserById(uid).subscribe((user) => {
            if (user) {
              console.log('user existe =>', user);
              this.router.navigate(['/sucursal/' + sessionStorage.getItem('urlUser')])
              // this.router.navigate(['/home'])
            } else {
              console.log('usuario indefinido redireccionar a form de register =>', user);
              this.router.navigate(['/auth/register-data'], { queryParams: { uid: uid, provider: 'facebook' } })
            }
          })
        })
      .catch(function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      var email = error.email;
      var credential = error.credential;
    });
  }

  private buildForm() {
    this.phoneForm = this.fB.group({
      phone: ['', [Validators.min(3000000000), Validators.max(3999999999)]],
    })
    this.codeForm = this.fB.group({
      code1: [, [Validators.required, Validators.min(0), Validators.max(9)]],
      code2: [, [Validators.required, Validators.min(0), Validators.max(9)]],
      code3: [, [Validators.required, Validators.min(0), Validators.max(9)]],
      code4: [, [Validators.required, Validators.min(0), Validators.max(9)]],
      code5: [, [Validators.required, Validators.min(0), Validators.max(9)]],
      code6: [, [Validators.required, Validators.min(0), Validators.max(9)]],
    })
    this.googleForm = this.fB.group({

    })
  }

  changeFocus(form) {
    if (form.code1 != null) document.getElementById('code2').focus();
    if (form.code2 != null) document.getElementById('code3').focus();
    if (form.code3 != null) document.getElementById('code4').focus();
    if (form.code4 != null) document.getElementById('code5').focus();
    if (form.code5 != null) document.getElementById('code6').focus();
    if (form.code6 != null) document.getElementById('sign-in-button').focus();
  }

}
