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
import { AngularFireAuthModule } from '@angular/fire/auth';
import { RegisterDataComponent } from './components/register-data/register-data.component';

@NgModule({
  declarations: [
    LoginComponent, 
    RegisterComponent, 
    LoginPhoneComponent, RegisterDataComponent,
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
