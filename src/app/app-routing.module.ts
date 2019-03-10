import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NewLeadComponent } from './CRM/Leads/new-lead/new-lead.component';
import { LeadListComponent } from './CRM/Leads/lead-list/lead-list.component';
import { LeadPageComponent } from './CRM/Leads/lead-page/lead-page.component';
import { LoginComponent } from './CRM/auth/login/login.component';
import { AuthGuard } from './services/auth/auth.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'newlead', component: NewLeadComponent, canActivate: [AuthGuard] },
  { path: 'leadlist', component: LeadListComponent, canActivate: [AuthGuard] },
  { path: 'leadlist/:id', component: LeadPageComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
