import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  { path: 'dashboard', loadChildren: () => import('../admin/dashboard/dashboard.module').then(m => m.DashboardModule) },
  { path: 'client', loadChildren: () => import('../admin/Clints/clints.module').then(m => m.ClintsModule) },
  { path: 'wallettier', loadChildren: () => import('../admin/wallettier/wallettier.module').then(m => m.WallettierModule) },
  { path: 'userWallet', loadChildren: () => import('../admin/user-wallet/user-wallet.module').then(m => m.UserWalletModule) },
  { path: 'withDrawal', loadChildren: () => import('./withdrawal-request/withdrawal-request.module').then(m => m.WithdrawalRequestModule) },
  { path: 'strategy', loadChildren: () => import('./strategy/strategy.module').then(m => m.StrategyModule) },
  { path: 'publishStrategy', loadChildren: () => import('../admin/publish-strategy/publish-strategy.module').then(m => m.PublishStrategyModule)},
  { path: 'support', loadChildren: () => import('../admin/support/support.module').then(m => m.SupportModule)},
  { path: 'banner', loadChildren: () => import('../admin/banner/banner.module').then(m => m.BannerModule)},

  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
