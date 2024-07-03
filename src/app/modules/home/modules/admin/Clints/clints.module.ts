import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClintsRoutingModule } from './clints-routing.module';
import { ClintComponent } from './clint/clint.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule, MatOptionModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { AddColumnModule } from 'src/app/_shared/modules/add-column/add-column.module';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NgxUiLoaderModule } from 'ngx-ui-loader';
import { MatSortModule } from '@angular/material/sort';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { MatTooltip, MatTooltipModule } from '@angular/material/tooltip';
import { LoggerComponent } from './logger/logger.component';
import { LoggerParamComponent } from './logger-param/logger-param.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ReferralComponent } from './referral/referral.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';



// import { AddColumnComponent } from './add-column/add-column.component';


@NgModule({
  declarations: [
    ClintComponent,
    LoggerComponent,
    LoggerParamComponent,
    ReferralComponent,
    
  ],providers:[MatDialogModule],
  imports: [
    AddColumnModule,
    NgxUiLoaderModule,
    MatProgressSpinnerModule,
    CommonModule,
    ClintsRoutingModule,
    MatOptionModule,MatButtonToggleModule,
  
    MatCheckboxModule,
    MatSelectModule,
    MatTableModule,
    MatCardModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatInputModule,
    MatIconModule,
    ReactiveFormsModule,
    MatSortModule,
    MatTooltipModule,
    MatToolbarModule,
  ]
})
export class ClintsModule { }
