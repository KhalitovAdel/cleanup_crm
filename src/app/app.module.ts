import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { Routes, RouterModule } from '@angular/router';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';
import { OwlDateTimeModule, OwlNativeDateTimeModule, OWL_DATE_TIME_LOCALE } from 'ng-pick-datetime';

import { B2bregularComponent } from './calculate/b2bregular/b2bregular.component';
import { CalculateService } from './services/calculate/calculate.service';
import { myHTTPService } from './services/HTTP/myhttp.service';
import { LeadListComponent } from './CRM/Leads/lead-list/lead-list.component';
import { LeadPageComponent } from './CRM/Leads/lead-page/lead-page.component';
import { NewLeadComponent } from './CRM/Leads/new-lead/new-lead.component';
import { NewTaskComponent } from './CRM/Tasks/new-task/new-task.component';

const appRoutes = [
  { path: 'newlead', component: NewLeadComponent },
  { path: 'leadlist', component: LeadListComponent },
  { path: 'leadlist/:id', component: LeadPageComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    B2bregularComponent,
    LeadListComponent,
    LeadPageComponent,
    NewLeadComponent,
    NewTaskComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    OwlDateTimeModule, 
    OwlNativeDateTimeModule,
  ],
  providers: [CalculateService, myHTTPService, {provide: OWL_DATE_TIME_LOCALE, useValue: 'ru'},],
  bootstrap: [AppComponent]
})
export class AppModule { }