import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CompaniesRoutingModule } from './companies-routing.module';
import { CompaniesComponent } from './companies/companies.component';
import { IndexCompaniesComponent } from './index/index-companies.component';
import { CreateCompaniesComponent } from './create/create-companies.component';
import { EditCompaniesComponent } from './edit/edit-companies.component';
import { LayoutModule } from '../layout/layout.module';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ComponentsModule } from '../components/components.module';


@NgModule({
  declarations: [CompaniesComponent, IndexCompaniesComponent, CreateCompaniesComponent, EditCompaniesComponent],
  imports: [
    CommonModule,
    CompaniesRoutingModule,
    LayoutModule,
    ComponentsModule,
    DataTablesModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule
  ]
})
export class CompaniesModule { }
