import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from 'src/app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { HomeComponent } from './components/home/home.component';
import { PanellComponent } from './components/panell/panell.component';
import { DataService } from './data.service';
import { WelcomePageComponent } from './components/welcome-page/welcome-page.component';
import { ModalComponent } from './components/modal/modal.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PanellComponent,
    WelcomePageComponent,
    ModalComponent,
  ],

  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    AppRoutingModule,
    RouterModule,
  ],
  exports: [
    WelcomePageComponent,
    PanellComponent,
    HomeComponent
    ],

  providers: [DataService],
  bootstrap: [AppComponent],
})
export class AppModule {}
