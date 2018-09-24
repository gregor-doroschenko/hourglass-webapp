import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { LoginRoutingModule } from './login/login-routing.module';
import { LoginComponent } from './login/login.component';
import { NavigationComponent } from './navigation/navigation.component';
import { MainComponent } from './main/main.component';
import { AuthenticationService } from './services/authentication/authentication.service';
import { AuthGuard } from './services/authguard/authguard.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavigationComponent,
    MainComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    LoginRoutingModule,
    AppRoutingModule,
  ],
  providers: [
    AuthenticationService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
