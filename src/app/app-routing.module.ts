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
  {path: 'index', component: IndexComponent, canActivate: [AuthGuard]},
  {path: 'dashboard/:moduleId', component: DashboardComponent, canActivate: [AuthGuard]},
  {path: 'chart/:moduleId/:startDate/:endDate/:measurementType', component: ChartComponent, canActivate: [AuthGuard]}
];


@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
