import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import Swal from "sweetalert2/dist/sweetalert2.js";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup

  constructor(
    private authService: AuthService,
    private fB: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.formBuilder();
  }

  private formBuilder() {
    this.loginForm = this.fB.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(10)]]
    })
  }

  login() {
    this.authService.loginUser(this.emailField.value, this.passwordField.value)
      .then(data => {
        this.router.navigate(['/sucursal/' + sessionStorage.getItem('urlUser')])
      }).catch(e => {
        console.log(e);
        Swal.fire('Error', e.message, 'error')
      })
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
