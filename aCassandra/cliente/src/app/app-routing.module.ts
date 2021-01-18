import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StarbucksComponent } from './starbucks/starbucks.component';

const routes: Routes = [
  {path: 'add', component: StarbucksComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
