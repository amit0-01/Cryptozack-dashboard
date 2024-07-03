import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StrategyListComponent } from './strategy-list/strategy-list.component';
import { StrategyTransactionComponent } from './strategy-transaction/strategy-transaction.component';

const routes: Routes = [
  {path:'',component:StrategyListComponent},
  {path:'str_transaction',component:StrategyTransactionComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StrategyRoutingModule { }
