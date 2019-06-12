import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { Angulartics2Module } from 'angulartics2';

import { NewLeadComponent } from './WORKSPACE/CRM/Leads/new-lead/new-lead.component';
import { LeadListComponent } from './WORKSPACE/CRM/Leads/lead-list/lead-list.component';
import { LeadPageComponent } from './WORKSPACE/CRM/Leads/lead-page/lead-page.component';
import { LoginComponent } from './WORKSPACE/Login/login.component';
import { AuthGuard } from './services/auth/auth.guard';
import { RegularComponent } from './Client/b2b/regular/regular.component';
import { DashboardComponent } from './WORKSPACE/Main-menu/dashboard.component';
import { OffersListComponent } from './WORKSPACE/CRM/Offers/offers-list/offers-list.component';
import { OutstaffComponent } from './Client/b2b/outstaff/outstaff.component';
import { ConsumablesComponent } from './WORKSPACE/Configuration/Consumables/consumables.component';
import { EmployeesComponent } from './WORKSPACE/Employees/new-employees/employees.component';
import { EmployeesListComponent } from './WORKSPACE/Employees/employees-list/employees-list.component';
import { EmplDashboardComponent } from './WORKSPACE/Employees/empl-dashboard/empl-dashboard.component';
import { EmployessPageComponent } from './WORKSPACE/Employees/employess-page/employess-page.component';
import { CrmBoardComponent } from './WORKSPACE/CRM/crm-board/crm-board.component';
import { ConfBoardComponent } from './WORKSPACE/Configuration/conf-board/conf-board.component';
import { RegistrationUserComponent } from './WORKSPACE/Configuration/Registration/Invite-user/registration-user.component';
import { RegisterUserComponent } from './WORKSPACE/Configuration/Registration/register-user/register-user.component';
import { CalcComponent } from './Client/stuff/calculate/calc/calc.component';
import { ChemistryComponent } from './Client/b2c/chemistry/chemistry.component';
import { MainMenuComponent } from './Client/main-menu/main-menu.component';
import { PolicyComponent } from './Client/policy/policy.component';

const routes: Routes = [
  { path: '', component: MainMenuComponent, children:[
    { path: '', pathMatch: 'full', component: RegularComponent },
    { path: 'chemistry', component: ChemistryComponent },
  ] },

  { path: 'workspace', component: DashboardComponent, canActivate: [AuthGuard], children: [
    { path: '', pathMatch: 'full', redirectTo: 'crm' },
    { path: 'crm', component: CrmBoardComponent, children:[
      { path: '', pathMatch: 'full', redirectTo: 'leadlist' },
      { path: 'leadlist', component: LeadListComponent },
      { path: 'leadlist/:id', component: LeadPageComponent },
      { path: 'newlead', component: NewLeadComponent },
      { path: 'alloffers', component: OffersListComponent },
    ] },

    { path: 'employees', component: EmplDashboardComponent, canActivate: [AuthGuard], children:[
      { path: '', pathMatch: 'full', redirectTo: 'list' },
      { path: 'new', component: EmployeesComponent, canActivate: [AuthGuard] },
      { path: 'list', component: EmployeesListComponent, canActivate: [AuthGuard]},
      { path: 'list/:id', component: EmployessPageComponent, canActivate: [AuthGuard] },
    ] },

    { path: 'configuration', component: ConfBoardComponent, canActivate: [AuthGuard]},
      { path: 'configuration/consumables', component: ConsumablesComponent, canActivate: [AuthGuard] },
      { path: 'configuration/registration', component: RegistrationUserComponent, canActivate: [AuthGuard] },

  ] },

    //PUBLIC
    { path: 'policy', component: PolicyComponent},
    { path: 'stuff/calculate', component: CalcComponent},
    { path: 'invite/:id', component: RegisterUserComponent},
    { path: 'workspace/login', component: LoginComponent},
    { path: 'outstaff', component: OutstaffComponent},
];
// component: LoginComponent,
@NgModule({
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    Angulartics2Module.forRoot({developerMode: false}),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
