import {
  MatInputModule, MatCardModule, MatButtonModule,
  MatToolbarModule, MatExpansionModule, MatProgressSpinnerModule,
  MatPaginatorModule,
  MatDialogModule
} from '@angular/material';
import { NgModule } from '@angular/core';

@NgModule({
  // imports:[] will be done automatically
  exports:[
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatExpansionModule,
    MatPaginatorModule,
    MatDialogModule,
    MatProgressSpinnerModule
  ]
})


export class AngularMaterialModule { }
