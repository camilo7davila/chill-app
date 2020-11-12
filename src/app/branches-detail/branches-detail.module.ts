import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BranchesDetailRoutingModule } from './branches-detail-routing.module';
import { BranchesDetailComponent } from './components/branches-detail/branches-detail.component';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../material/material.module';
import { BranchesMenuCategoriesComponent } from './components/branches-menu-categories/branches-menu-categories.component';


@NgModule({
  declarations: [
    BranchesDetailComponent,
    BranchesMenuCategoriesComponent,
  ],
  imports: [
    CommonModule,
    BranchesDetailRoutingModule,
    SharedModule,
    MaterialModule
  ]
})
export class BranchesDetailModule { }
