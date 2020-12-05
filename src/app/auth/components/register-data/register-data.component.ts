import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import Swal from "sweetalert2/dist/sweetalert2.js";

import { AngularFireAuth } from "@angular/fire/auth";

import { User } from 'src/app/core/interfaces/restaurant.interface';

@Component({
  selector: 'app-register-data',
  templateUrl: './register-data.component.html',
  styleUrls: ['./register-data.component.scss']
})
export class RegisterDataComponent implements OnInit {
  public loginForm: FormGroup;
  public userForm: FormGroup;

  public isLoading: boolean;

  public uidQuery: string
  public providerQuery: string
  public phoneQuery: string

  public user: any

  public datausercreate: any

  public toshow: string;


  constructor(
    private authService: AuthService,
    private fB: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private AFA: AngularFireAuth,
  ) {
    this.isLoading = false
  }

  ngOnInit(): void {
    this.authService.guardUser().then(data => {
      console.log('INFORMACION USER CREADO', data);
      this.datausercreate = data

    });

    this.route.queryParams.subscribe(data => {
      console.log(data);
      this.uidQuery = data.uid
      this.providerQuery = data.provider
      this.phoneQuery = data.phone
    })
    this.formBuilder();
  }

  private formBuilder() {
    this.loginForm = this.fB.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      lastname: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      nameuser: ['', [Validators.required, Validators.minLength(2)]],
      phone: ['+57' + this.phoneQuery, [Validators.required, Validators.minLength(2)]],
    })
  }
  registerPhone() {
    // console.log(this.loginForm);
    // console.log(this.user);
    this.user = {
      address: '',
      authenticationProvider: [
        {
          auth: this.loginForm.get('phone').value,
          provider: this.providerQuery
        }
      ],
      birthday: '',
      creationDate: this.datausercreate.metadata.creationTime,
      description: '',
      email: this.loginForm.get('email').value,
      image: '',
      lastName: this.loginForm.get('lastname').value,
      name: this.loginForm.get('name').value,
      phone: this.loginForm.get('phone').value,
      sex: '0',
      token: '',
      userName: this.loginForm.get('nameuser').value,
    }
    this.isLoading = true;
    this.authService.registerUserInDB(this.uidQuery, this.user)
      .then(data => {
        console.log('data que salio', data);
        this.isLoading = false;
        this.router.navigate(['/sucursal/' + sessionStorage.getItem('urlUser')]);
        // this.router.navigate(['/home']);

        console.log(this.user);
      })
  }

  registerGoogle() {
    this.user = {
      address: '',
      authenticationProvider: [
        {
          auth: this.datausercreate.email,
          provider: this.providerQuery
        }
      ],
      birthday: '',
      creationDate: this.datausercreate.metadata.creationTime,
      description: '',
      email: this.datausercreate.email,
      image: this.datausercreate.photoURL,
      lastName: this.datausercreate.displayName,
      name: this.datausercreate.displayName,
      phone: '',
      sex: '0',
      token: '',
      userName: this.loginForm.get('nameuser').value,
    }
    this.isLoading = true;
    this.authService.registerUserInDB(this.uidQuery, this.user)
      .then(data => {
        console.log('data que salio', data);
        this.isLoading = false;
        this.router.navigate(['/sucursal/' + sessionStorage.getItem('urlUser')]);
        // this.router.navigate(['/home']);
        console.log(this.user);
      })
  }

  registerFacebook() {
    this.user = {
      address: '',
      authenticationProvider: [
        {
          auth: this.datausercreate.email,
          provider: this.providerQuery
        }
      ],
      birthday: '',
      creationDate: this.datausercreate.metadata.creationTime,
      description: '',
      email: this.datausercreate.email,
      image: '',
      lastName: this.datausercreate.displayName,
      name: '',
      phone: '',
      sex: '0',
      token: '',
      userName: this.loginForm.get('nameuser').value,
    }
    this.isLoading = true;
    this.authService.registerUserInDB(this.uidQuery, this.user)
      .then(data => {
        console.log('data que salio', data);
        this.isLoading = false;
        this.router.navigate(['/sucursal/' + sessionStorage.getItem('urlUser')]);
        // this.router.navigate(['/home']);
        console.log(this.user);
      })
  }

  get nameField() { return this.loginForm.get('name') }

  get nameFieldIsInvalid() {
    return (this.nameField.touched && this.nameField.dirty) || this.nameField.invalid
  }

  get lastnameField() { return this.loginForm.get('lastname') }

  get lastnameFieldIsInvalid() {
    return (this.lastnameField.touched && this.lastnameField.dirty) || this.lastnameField.invalid
  }
  get nameuserField() { return this.loginForm.get('nameuser') }

  get nameuserFieldIsInvalid() {
    return (this.nameuserField.touched && this.nameuserField.dirty) || this.nameuserField.invalid
  }
  get phoneField() { return this.loginForm.get('phone') }

  get phoneFieldIsInvalid() {
    return (this.phoneField.touched && this.phoneField.dirty) || this.phoneField.invalid
  }

  get emailField() { return this.loginForm.get('email') }

  get emailFieldIsValid() {
    return this.emailField.touched && this.emailField.valid
  }

  get emailFieldIsInvalid() {
    return (this.emailField.touched && this.emailField.dirty) || this.emailField.invalid
  }

  get passwordField() { return this.loginForm.get('password') }

  get passwordFieldIsValid() {
    return this.passwordField.touched && this.passwordField.valid
  }

  get passwordFieldIsInvalid() {
    return (this.passwordField.touched || this.passwordField.dirty) && this.passwordField.invalid
  }

}


