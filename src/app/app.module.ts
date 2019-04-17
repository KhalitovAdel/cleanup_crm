import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
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
import { MatIconModule } from '@angular/material/icon';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { CookieService } from 'ngx-cookie-service';
import { TextMaskModule } from 'angular2-text-mask';
import { FlexLayoutModule } from '@angular/flex-layout';
import { OwlModule } from 'ngx-owl-carousel';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

import { registerLocaleData } from '@angular/common';
import localeRu from '@angular/common/locales/ru';

import { B2bregularComponent } from './calculate/b2bregular/b2bregular.component';
import { CalculateService } from './services/calculate/calculate.service';
import { myHTTPService } from './services/HTTP/myhttp.service';
import { LeadListComponent } from './CRM/Leads/lead-list/lead-list.component';
import { LeadPageComponent } from './CRM/Leads/lead-page/lead-page.component';
import { NewLeadComponent } from './CRM/Leads/new-lead/new-lead.component';
import { FiltersPipeCustom } from './filters.pipe';
import { OfferIntoLeadComponent, BottomSheet } from './CRM/Offers/offer-into-lead/offer-into-lead.component';
import { AlertComponent } from './services/alert/alert.service';
import { LoginComponent } from './CRM/auth/login/login.component';
import { AuthGuard } from './services/auth/auth.guard';
import { RegularComponent } from './Client/b2b/regular/regular.component';
import { DashboardComponent } from './CRM/Dashboard/dashboard/dashboard.component';
import { OffersListComponent } from './CRM/Offers/offers-list/offers-list.component';
import { OutstaffComponent } from './Client/b2b/outstaff/outstaff.component';
import { ConsumablesComponent } from './CRM/Configuration/consumables/consumables.component';
import { CommonModule } from '@angular/common';
import { EmployeesComponent } from './CRM/Contacts/Employees/employees/employees.component';
import { EmployeesListComponent } from './CRM/Contacts/Employees/employees-list/employees-list.component';

registerLocaleData(localeRu, 'ru');

@NgModule({
  declarations: [
    AppComponent,
    B2bregularComponent,
    LeadListComponent,
    LeadPageComponent,
    NewLeadComponent,
    FiltersPipeCustom,
    OfferIntoLeadComponent,
    AlertComponent,
    BottomSheet,
    LoginComponent,
    RegularComponent,
    DashboardComponent,
    OffersListComponent,
    OutstaffComponent,
    ConsumablesComponent,
    EmployeesComponent,
    EmployeesListComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    FormsModule,
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
    MatSnackBarModule,
    MatIconModule,
    MatBottomSheetModule,
    TextMaskModule,
    FlexLayoutModule,
    OwlModule,
    MatSidenavModule,
    MatSlideToggleModule,
    MatAutocompleteModule
  ],
  entryComponents: [OfferIntoLeadComponent, AlertComponent, BottomSheet],
  providers: [
    CalculateService, 
    myHTTPService, 
    {provide: OWL_DATE_TIME_LOCALE, useValue: 'ru'},
    AuthGuard,
    CookieService,
    { provide: LOCALE_ID, useValue: "ru" }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { 
  
}