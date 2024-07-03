import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WallettierListComponent } from './wallettier-list/wallettier-list.component';

const routes: Routes = [
  {path:'',component:WallettierListComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WallettierRoutingModule { }
