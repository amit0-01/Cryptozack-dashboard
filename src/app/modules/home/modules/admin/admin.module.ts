import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { ClintsModule } from './Clints/clints.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { WallettierModule } from './wallettier/wallettier.module';
import {MatToolbarModule} from '@angular/material/toolbar';


@NgModule({
  declarations: [
  
  ],

  imports: [
    CommonModule,
    MatOptionModule,
    MatSelectModule,
    AdminRoutingModule,
    MatTableModule,
    MatCardModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatInputModule,
    MatIconModule,
    ReactiveFormsModule,
    MatDialogModule,
    ClintsModule,
    DashboardModule,
    WallettierModule,
    MatToolbarModule
  ],
  providers:[]
})
export class AdminModule { }
