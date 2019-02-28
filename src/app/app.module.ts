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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { OwlDateTimeModule, OwlNativeDateTimeModule, OWL_DATE_TIME_LOCALE } from 'ng-pick-datetime';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule, MatFormFieldModule } from '@angular/material';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { B2bregularComponent } from './calculate/b2bregular/b2bregular.component';
import { CalculateService } from './services/calculate/calculate.service';
import { myHTTPService } from './services/HTTP/myhttp.service';
import { LeadListComponent } from './CRM/Leads/lead-list/lead-list.component';
import { LeadPageComponent } from './CRM/Leads/lead-page/lead-page.component';
import { NewLeadComponent, AlertComponent } from './CRM/Leads/new-lead/new-lead.component';
import { FiltersPipeCustom } from './filters.pipe';
import { OfferIntoLeadComponent } from './CRM/Offers/offer-into-lead/offer-into-lead.component';


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
    FiltersPipeCustom,
    OfferIntoLeadComponent,
    AlertComponent
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
    ReactiveFormsModule,
    MatButtonModule,
    MatMenuModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatChipsModule,
    MatDialogModule,
    MatSnackBarModule
  ],
  entryComponents: [OfferIntoLeadComponent, AlertComponent],
  providers: [
    CalculateService, 
    myHTTPService, 
    {provide: OWL_DATE_TIME_LOCALE, useValue: 'ru'},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }