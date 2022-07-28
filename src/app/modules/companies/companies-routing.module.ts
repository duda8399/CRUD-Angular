import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CompaniesComponent } from './companies/companies.component';
import { CreateCompaniesComponent } from './create/create-companies.component';
import { EditCompaniesComponent } from './edit/edit-companies.component';
import { IndexCompaniesComponent } from './index/index-companies.component';


const routes: Routes = [
  {
    path: '', component: CompaniesComponent,  children: [
      {
        path: '', component: IndexCompaniesComponent,
      },
      {
        path: 'create', component: CreateCompaniesComponent,
      },
      {
        path: 'edit/:id', component: EditCompaniesComponent,
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompaniesRoutingModule { }
