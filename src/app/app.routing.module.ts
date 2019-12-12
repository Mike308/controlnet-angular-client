import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {AuthGuard} from './guard/auth.guard';
import {IndexComponent} from './index/index.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {ChartComponent} from './chart/chart.component';
import {ModulePanelComponent} from './module-panel/module-panel.component';
import {ModuleSetupComponent} from './module-setup/module-setup.component';

const appRoutes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {
    path: 'dashboard', component: IndexComponent, canActivate: [AuthGuard], children: [
      {path: ':moduleId', component: DashboardComponent},
      {path: ':moduleId/chart/:startDate/:endDate/:measurementType', component: ChartComponent},
      {path: ':moduleId/edit', component: ModuleSetupComponent, canActivate: [AuthGuard]}]
  },
  {path: 'module-panel', component: ModulePanelComponent, canDeactivate: [AuthGuard]},
  {
    path: 'module-setup/:moduleId', component: ModuleSetupComponent, canActivate: [AuthGuard]
  }
];


@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
