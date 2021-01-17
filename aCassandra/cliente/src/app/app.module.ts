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

@NgModule({
  declarations: [
    AppComponent,
    StarbuckComponent,
    StarbucksComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule
  ],
  providers: [StarbucksService],
  bootstrap: [AppComponent]
})
export class AppModule { }
