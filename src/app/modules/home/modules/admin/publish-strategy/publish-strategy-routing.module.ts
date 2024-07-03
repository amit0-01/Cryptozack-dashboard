import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PublishStrategyComponent } from './publish-strategy/publish-strategy.component';

const routes: Routes = [
  {
    path: '',
    component: PublishStrategyComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublishStrategyRoutingModule { }
