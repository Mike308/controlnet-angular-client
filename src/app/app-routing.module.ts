import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {AuthGuard} from './guard/auth.guard';
import {IndexComponent} from './index/index.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {ChartComponent} from './chart/chart.component';

const appRoutes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {
    path: 'dashboard', component: IndexComponent, canActivate: [AuthGuard], children: [
      {path: ':moduleId', component: DashboardComponent},
      {path: ':moduleId/chart/:startDate/:endDate/:measurementType', component: ChartComponent}]
  }
];


@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
