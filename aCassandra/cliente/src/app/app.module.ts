import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MaterialModule } from './material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StarbucksComponent } from './starbucks/starbucks.component';
import { StarbuckComponent } from '../app/starbucks/starbuck/starbuck.component';
import { StarbucksService } from './shared/starbucks.service';
import { HttpClientModule } from '@angular/common/http';
import { StarbuckListComponent } from './starbucks/starbuck-list/starbuck-list.component';
import { GoogleMapsModule } from '@angular/google-maps';

@NgModule({
  declarations: [
    AppComponent,
    StarbuckComponent,
    StarbucksComponent,
    StarbuckListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    GoogleMapsModule,
  ],
  providers: [StarbucksService],
  bootstrap: [AppComponent],
  entryComponents: [StarbuckComponent],
})
export class AppModule { }
