import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  //{path: '', redirectTo: 'dashboard', pathMatch: 'full'},
  {path: '', loadChildren: () => import('./modules/companies/companies.module').then(m => m.CompaniesModule)},
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
