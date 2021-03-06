import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminHomePageComponent } from './admin-pages/admin-home-page/admin-home-page.component';

import { ClientHomePageComponent } from './client-pages/client-home-page/client-home-page.component';
import { LoginPageComponent } from './login-page/login-page.component';

const routes: Routes = [
  { path: '', redirectTo: '/client/index', pathMatch: 'full'},
  { path: 'admin', redirectTo: '/admin/index', pathMatch: 'full'},
  { path: 'client', component: ClientHomePageComponent},
  { path: 'login', component: LoginPageComponent},
  { path: 'admin', component: AdminHomePageComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
