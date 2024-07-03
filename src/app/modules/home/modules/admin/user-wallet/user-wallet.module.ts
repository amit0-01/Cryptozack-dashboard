import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserWalletRoutingModule } from './user-wallet-routing.module';
import { WalletComponent } from './wallet/wallet.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxUiLoaderModule } from 'ngx-ui-loader';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import {MatSelectModule} from '@angular/material/select';

@NgModule({
  declarations: [
    WalletComponent
  ],
  imports: [
    CommonModule,
    UserWalletRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxUiLoaderModule,
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatToolbarModule,
    MatTooltipModule,
    MatSelectModule

  ]
})
export class UserWalletModule { }
