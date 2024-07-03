import { RouterModule } from '@angular/router';
import {  NoopAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SideNavComponent } from './side-nav.component';
import { MenuListComponent } from './components/menu-list/menu-list.component';

import { MatIconModule } from "@angular/material/icon";
import { MatListModule } from "@angular/material/list";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatButtonModule } from "@angular/material/button";
import { MatToolbarModule } from '@angular/material/toolbar';

@NgModule({
  declarations: [
    SideNavComponent,
    MenuListComponent,
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatListModule,
    MatSidenavModule,
    MatButtonModule,
    RouterModule,
    MatToolbarModule
  ],
  exports: [
    SideNavComponent
  ]
})
export class SideNavModule { }
