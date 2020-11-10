import { NgModule } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatCardModule} from '@angular/material/card';

@NgModule({
  imports: [
    MatInputModule,
    MatToolbarModule,
    MatCardModule
  ],
  exports: [
    MatInputModule,
    MatToolbarModule,
    MatCardModule
  ]
})
export class MaterialModule { }
