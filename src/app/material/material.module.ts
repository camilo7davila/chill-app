import { NgModule } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';

@NgModule({
  imports: [
    MatInputModule,
    MatToolbarModule
  ],
  exports: [
    MatInputModule,
    MatToolbarModule
  ]
})
export class MaterialModule { }
