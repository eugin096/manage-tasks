import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignInComponent } from './sign-in/sign-in.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuardService as AuthGuard } from './auth-guard.service';
const routes: Routes = [
  {path:'', redirectTo:'/signIn', pathMatch:'full'},
  {path:'signIn', component:SignInComponent},
  {path:'home', component:DashboardComponent,canActivate:[AuthGuard]},
  { path: '**', redirectTo: '/signIn' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
