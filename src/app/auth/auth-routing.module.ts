import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginPhoneComponent } from './components/login-phone/login-phone.component';
import { VerificationCodePhoneComponent } from './components/verification-code-phone/verification-code-phone.component';
import { RegisterDataComponent } from './components/register-data/register-data.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'login-phone',
    component: LoginPhoneComponent
  },
  {
    path: 'login-phone-verification',
    component: VerificationCodePhoneComponent
  },
  {
    path: 'register-data',
    component: RegisterDataComponent
  },
  {
    path: '',
    redirectTo: 'register'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
