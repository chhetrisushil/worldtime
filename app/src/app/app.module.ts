import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import {AppRoutingModule} from "./app-routing.module";
import { HeaderComponent } from './page/header/header.component';
import { LoginComponent } from './page/login/login.component';
import { HomeComponent } from './page/home/home.component';
import { SignupComponent } from './page/signup/signup.component';
import {FormsModule} from "@angular/forms";
import {UserService} from "./services/user.service";
import {HttpClientModule} from "@angular/common/http";
import {AppConfig} from "./app.config";
import { DashboardComponent } from './page/dashboard/dashboard.component';
import {TimeService} from "./services/time.service";


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    HomeComponent,
    SignupComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [
    UserService,
    TimeService,
    AppConfig
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
