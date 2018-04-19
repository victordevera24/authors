import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { EditComponent } from './edit/edit.component';
import { AddComponent } from './add/add.component';

const routes: Routes = [
  { path: 'app' , component: AppComponent },
  { path: 'edit/:id' , component: EditComponent },
  { path: 'add' , component: AddComponent },
  { path: '**' , component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
