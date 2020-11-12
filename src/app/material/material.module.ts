import { NgModule } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';

@NgModule({
  imports: [
    MatInputModule,
    MatToolbarModule,
    MatCardModule,
    MatButtonModule
  ],
  exports: [
    MatInputModule,
    MatToolbarModule,
    MatCardModule,
    MatButtonModule
  ]
})
export class MaterialModule { }
