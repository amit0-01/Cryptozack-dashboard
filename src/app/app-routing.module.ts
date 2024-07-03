import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './_shared/guards/auth/auth.guard';
import { HomeGuard } from './_shared/guards/home/home.guard';

const routes: Routes = [
  {
    path: 'login', canActivate: [AuthGuard], canLoad:[AuthGuard] ,loadChildren: () => (import('./modules/auth/auth.module').then(m => m.AuthModule))
  },
  
  {
    path: '',  canActivate: [HomeGuard], canLoad:[HomeGuard], loadChildren: () => (import('./modules/home/home.module').then(m => m.HomeModule)),
  },
  {
    path: '**', redirectTo: 'login', pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
