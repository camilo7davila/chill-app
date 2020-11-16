import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { MaterialModule } from '../material/material.module';
import { ModalRestaurantsComponent } from './components/modal-restaurants/modal-restaurants.component';
import { RouterModule } from '@angular/router';
import { ModalMenuDetailComponent } from './components/modal-menu-detail/modal-menu-detail.component';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { CustomizationComponent } from './components/modal-menu-detail/customization/customization.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OptionComponent } from './components/modal-menu-detail/option/option.component';
import { FooterModalComponent } from './components/modal-menu-detail/footer-modal/footer-modal.component';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    ModalRestaurantsComponent,
    ModalMenuDetailComponent,
    CustomizationComponent,
    OptionComponent,
    FooterModalComponent,

  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    ModalRestaurantsComponent,
    ModalMenuDetailComponent,
    NgxSkeletonLoaderModule
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    NgxSkeletonLoaderModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class SharedModule { }
