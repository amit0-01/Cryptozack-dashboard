import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertComponent } from './alert.component';
import { MatButtonModule } from '@angular/material/button';



@NgModule({
  declarations: [
    AlertComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule
  ],
  exports: [
    AlertComponent
  ]
})
export class AlertModule { }
