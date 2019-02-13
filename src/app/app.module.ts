import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';

import { B2bregularComponent } from './calculate/b2bregular/b2bregular.component';
import { CalculateService } from './services/calculate.service';

@NgModule({
  declarations: [
    AppComponent,
    B2bregularComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    FormsModule
  ],
  providers: [CalculateService],
  bootstrap: [AppComponent]
})
export class AppModule { }
