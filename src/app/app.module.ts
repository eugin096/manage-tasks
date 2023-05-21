import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignInService } from './sign-in/sign-in.service';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastComponent } from './toast/toast.component';
import { ToastService } from './toast/toast.service';
import { ToasterComponent } from './toaster/toaster.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeaderComponent } from './header/header.component';
import { TaskCardComponent } from './task-card/task-card.component';
import { AddTaskComponent } from './add-task/add-task.component';
import { AuthGuardService } from './auth-guard.service';
@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    ToastComponent,
    ToasterComponent,
    DashboardComponent,
    HeaderComponent,
    TaskCardComponent,
    AddTaskComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    
  ],
  providers: [SignInService, ToastService, AuthGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
