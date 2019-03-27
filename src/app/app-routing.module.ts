import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NewLeadComponent } from './CRM/Leads/new-lead/new-lead.component';
import { LeadListComponent } from './CRM/Leads/lead-list/lead-list.component';
import { LeadPageComponent } from './CRM/Leads/lead-page/lead-page.component';
import { LoginComponent } from './CRM/auth/login/login.component';
import { AuthGuard } from './services/auth/auth.guard';
import { RegularComponent } from './Client/b2b/regular/regular.component';
const baseCrmPath = 'crm';
const routes: Routes = [
  { path: '', component: RegularComponent },
  { path: baseCrmPath, component: LoginComponent, children: [
    { path: 'newlead', component: NewLeadComponent, canActivate: [AuthGuard] },
    { path: 'leadlist', component: LeadListComponent, canActivate: [AuthGuard] },
    { path: 'leadlist/:id', component: LeadPageComponent, canActivate: [AuthGuard] },
  ] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
