import { NgxUiLoaderModule } from 'ngx-ui-loader';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { SideNavModule } from './modules/side-nav/side-nav.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import {MatMenuModule} from '@angular/material/menu';
import { MatOptionModule } from '@angular/material/core';
import {MatTreeModule} from '@angular/material/tree';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatTooltipModule} from '@angular/material/tooltip';
import { ToastrModule } from 'ngx-toastr';
import { AdminModule } from './modules/admin/admin.module';


@NgModule({
  declarations: [
    HomeComponent,
  ],

  imports: [
    MatExpansionModule,
    MatTreeModule,
    CommonModule,
    HomeRoutingModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    RouterModule,
    SideNavModule,
    RouterModule,
    MatMenuModule,
   
    MatSelectModule,
    MatOptionModule,
    MatFormFieldModule,
    MatIconModule,
    NgxUiLoaderModule,
    MatMenuModule,
    MatTooltipModule,
    ToastrModule.forRoot(),
    AdminModule
  ]
})
export class HomeModule { }
