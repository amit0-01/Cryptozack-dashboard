import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StrategyListComponent } from '../strategy/strategy-list/strategy-list.component';
import { ClintComponent } from './clint/clint.component';
import { LoggerComponent } from './logger/logger.component';
import { ReferralComponent } from './referral/referral.component';

const routes: Routes = [
  {path:'',component:ClintComponent},
  {path:'logger', component: LoggerComponent},
  {path:'referral', component: ReferralComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClintsRoutingModule { }
