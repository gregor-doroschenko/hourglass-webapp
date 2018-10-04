import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import {
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule, MatDialogModule, MatDividerModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatToolbarModule,
  MatSelect,
  MatSelectModule,
  MatOptionModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSpinner,
  MatProgressSpinnerModule,
  MatDatepickerModule,
  MatNativeDateModule
} from '@angular/material';
import { MatFormFieldModule } from '@angular/material/form-field';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { LoginRoutingModule } from './login/login-routing.module';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';
import { AuthenticationService } from './services/authentication/authentication.service';
import { AuthInterceptor } from './services/authguard/auth.interceptor';
import { AuthGuard } from './services/authguard/authguard.service';
import { NavbarComponent } from './components/navbar/navbar.component';
import { BasedataService } from './services/shared/basedata.service';
import { TimerService } from './services/timer/timer.service';
import { UserService } from './services/user/user.service';
import { TimerComponent } from './components/timer/timer.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { TimerControlComponent } from './components/timer/timer-control/timer-control.component';
import { TimeLogsComponent } from './components/timer/time-logs/time-logs.component';
import { TimelogDeleteDialogComponent } from './components/timer/time-logs/timelog-delete-dialog/timelog-delete-dialog.component';
import { TimerControlManualComponent } from './components/timer/timer-control-manual/timer-control-manual.component';
import { RedmineService } from './services/redmine/redmine.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainComponent,
    NavbarComponent,
    TimerComponent,
    DashboardComponent,
    TimerControlComponent,
    TimeLogsComponent,
    TimelogDeleteDialogComponent,
    TimerControlManualComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    LoginRoutingModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatDividerModule,
    MatDialogModule,
    MatOptionModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  providers: [
    AuthenticationService,
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    BasedataService,
    UserService,
    TimerService,
    RedmineService
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    TimelogDeleteDialogComponent
  ]
})
export class AppModule { }
