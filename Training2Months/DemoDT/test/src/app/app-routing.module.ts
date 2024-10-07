import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './auth.guard';
import { LoginPageComponent } from './login-page/login-page.component';
import { HomePageComponent } from './home-page/home-page.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/login-page' },
  // { path: 'home' , component: HomeComponent , canActivate: [AuthGuard]},
  { path: 'home' , component: HomeComponent},
  { path: 'login' , component: LoginComponent},
  { path: 'login-page' , component: LoginPageComponent},
  { path: 'home-page' , component: HomePageComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
