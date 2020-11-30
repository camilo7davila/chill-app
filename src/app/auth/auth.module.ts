import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule } from '@angular/forms';
import { AuthRoutingModule } from './auth-routing.module';
import { SharedModule } from '../shared/shared.module';
import { CoreModule } from '../core/core.module';
import { MaterialModule } from '../material/material.module';

import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginPhoneComponent } from './components/login-phone/login-phone.component';
import { VerificationCodePhoneComponent } from './components/verification-code-phone/verification-code-phone.component';
import { RegisterDataComponent } from './components/register-data/register-data.component';
import { AngularFireAuthModule } from '@angular/fire/auth';

@NgModule({
  declarations: [
    LoginComponent, 
    RegisterComponent, 
    LoginPhoneComponent,
    VerificationCodePhoneComponent,
    RegisterDataComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    SharedModule,
    CoreModule,
    MaterialModule,
    ReactiveFormsModule,
    AngularFireAuthModule
  ]
})
export class AuthModule { }
