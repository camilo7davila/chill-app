import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { MaterialModule } from '../material/material.module';
import { ModalRestaurantsComponent } from './components/modal-restaurants/modal-restaurants.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    HeaderComponent, 
    FooterComponent,
    ModalRestaurantsComponent,
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    ModalRestaurantsComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule
  ]
})
export class SharedModule { }
