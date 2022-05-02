import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './main/config/components/login/login.component';
import { MainComponent } from './main/config/components/main/main.component';


const routes: Routes = [
  { path: 'Login', component: LoginComponent },
  { path: 'Main', component: MainComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
