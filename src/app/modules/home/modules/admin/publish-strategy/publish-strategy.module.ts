import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PublishStrategyRoutingModule } from './publish-strategy-routing.module';
import { PublishStrategyComponent } from './publish-strategy/publish-strategy.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { NgApexchartsModule } from 'ng-apexcharts';
import { MatIconModule } from '@angular/material/icon';
import { PublishStrategyListComponent } from './publish-strategy-list/publish-strategy-list.component';
import { StrategyDetailsComponent } from './strategy-details/strategy-details.component';
import { NgxUiLoaderModule } from 'ngx-ui-loader';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatToolbarModule } from '@angular/material/toolbar';


@NgModule({
  declarations: [
    PublishStrategyComponent,
    PublishStrategyListComponent,
    StrategyDetailsComponent
  ],
  imports: [
    CommonModule,
    PublishStrategyRoutingModule,
    MatTableModule,
    MatPaginatorModule,
    NgApexchartsModule,
    MatIconModule,
    NgxUiLoaderModule,
    MatTooltipModule,
    MatToolbarModule
  ]
})
export class PublishStrategyModule { }
