import { NgModule } from '@angular/core';
import { Router, RouterModule, Routes } from '@angular/router';

import { WelcomePageComponent } from './app/components/welcome-page/welcome-page.component';
import { HomeComponent } from './app/components/home/home.component';
import { ModalComponent } from './app/components/modal/modal.component';


// A VENIR: import { ModalComponent } from './modal/modal.component';


const routes: Routes = [
{
  path:"welcome",
  component: WelcomePageComponent,
},
{
  path:"home",
  component: HomeComponent,
},
{
  path:"modal",
  component: ModalComponent,
},
{
path: "**",
redirectTo: "welcome"
}
]


@NgModule({
imports: [
  RouterModule.forRoot(routes)

],
exports: [
  RouterModule,
]
})
export class AppRoutingModule { }
