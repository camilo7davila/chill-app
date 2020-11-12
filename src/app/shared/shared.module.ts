import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { MaterialModule } from '../material/material.module';
import { ModalRestaurantsComponent } from './components/modal-restaurants/modal-restaurants.component';
import { RouterModule } from '@angular/router';
import { ModalMenuDetailComponent } from './components/modal-menu-detail/modal-menu-detail.component';

@NgModule({
  declarations: [
    HeaderComponent, 
    FooterComponent,
    ModalRestaurantsComponent,
    ModalMenuDetailComponent,
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    ModalRestaurantsComponent,
    ModalMenuDetailComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule
  ]
})
export class SharedModule { }
