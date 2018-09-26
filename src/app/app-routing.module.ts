import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { TimerComponent } from './components/timer/timer.component';
import { MainComponent } from './main/main.component';
import { AuthGuard } from './services/authguard/authguard.service';

const appRoutes: Routes = [
  {
    path: '',
    redirectTo: '/main/timer',
    pathMatch: 'full'
  },
  {
    path: 'main',
    canActivate: [AuthGuard],
    component: MainComponent,
    children: [
      {
        path: '',
        redirectTo: 'timer',
        pathMatch: 'full'
      },
      {
        path: 'timer',
        component: TimerComponent
      },
      {
        path: 'dashboard',
        component: DashboardComponent
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class AppRoutingModule {}
