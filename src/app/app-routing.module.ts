import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NewLeadComponent } from './CRM/Leads/new-lead/new-lead.component';
import { LeadListComponent } from './CRM/Leads/lead-list/lead-list.component';
import { LeadPageComponent } from './CRM/Leads/lead-page/lead-page.component';
import { LoginComponent } from './CRM/auth/login/login.component';
import { AuthGuard } from './services/auth/auth.guard';
import { RegularComponent } from './Client/b2b/regular/regular.component';
import { DashboardComponent } from './CRM/Dashboard/dashboard/dashboard.component';
import { OffersListComponent } from './CRM/Offers/offers-list/offers-list.component';
import { OutstaffComponent } from './Client/b2b/outstaff/outstaff.component';
import { ConsumablesComponent } from './CRM/Configuration/consumables/consumables.component';

const baseCrmPath = 'crm';
const routes: Routes = [
  { path: '', component: RegularComponent, pathMatch: 'full' },
  { path: baseCrmPath, component: DashboardComponent, canActivate: [AuthGuard], children: [
    { path: 'alloffers', component: OffersListComponent, canActivate: [AuthGuard] },
    { path: 'newlead', component: NewLeadComponent, canActivate: [AuthGuard] },
    { path: 'leadlist', component: LeadListComponent, canActivate: [AuthGuard] },
    { path: 'leadlist/:id', component: LeadPageComponent, canActivate: [AuthGuard] },
    { path: 'сonsumables', component: ConsumablesComponent, canActivate: [AuthGuard] },
  ] },
  { path: baseCrmPath + '/login', component: LoginComponent},
  { path: 'outstaff', component: OutstaffComponent},
];
// component: LoginComponent,
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
