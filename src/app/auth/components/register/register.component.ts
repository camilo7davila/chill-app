import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import Swal from "sweetalert2/dist/sweetalert2.js";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  
  public loginForm: FormGroup;
  public isLoading: boolean;

  constructor(
    private authService: AuthService,
    private fB: FormBuilder,
    private router: Router
  ) { 
    this.isLoading = false
  }

  ngOnInit(): void {
    this.formBuilder();
  }

  private formBuilder() {
    this.loginForm = this.fB.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(10)]]
    })
  }

  register() {
    this.isLoading = true
    this.authService.registerUser(this.emailField.value, this.passwordField.value)
      .then(data => {
        this.isLoading = false;
        this.router.navigate(['/sucursal/' + sessionStorage.getItem('urlUser')])
      }).catch(e => {
        this.isLoading = false
        Swal.fire('Error', e.message, 'error')
      })
  }

  get nameField() { return this.loginForm.get('name') }

  get nameFieldIsInvalid() {
    return (this.nameField.touched && this.nameField.dirty) || this.nameField.invalid
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
