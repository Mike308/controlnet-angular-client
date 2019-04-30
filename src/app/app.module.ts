import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {
  MatButtonModule,
  MatCardModule,
  MatChipsModule,
  MatDialogModule,
  MatFormFieldModule,
  MatInputModule,
  MatListModule
} from '@angular/material';
import {FlexLayoutModule} from '@angular/flex-layout';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import {AuthService} from './auth/auth.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { IndexComponent } from './index/index.component';
import { NavComponent } from './nav/nav.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import {NavService} from './nav/service/nav.service';
import {AppRoutingModule} from './app-routing.module';
import {AuthGuard} from './guard/auth.guard';
import {DashboardService} from './dashboard/service/dashboard.service';
import {GaugesModule} from 'ng-canvas-gauges';
import {NgxGaugeModule} from 'ngx-gauge';
import { ChartComponent } from './chart/chart.component';
import {ChartService} from './chart/service/chart.service';
import {ChartsModule} from 'ng2-charts';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    IndexComponent,
    NavComponent,
    DashboardComponent,
    ChartComponent
  ],
  imports: [
    BrowserModule,
    MatButtonModule,
    MatInputModule,
    FlexLayoutModule,
    MatFormFieldModule,
    MatListModule,
    BrowserAnimationsModule,
    MatCardModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    GaugesModule,
    MatChipsModule,
    NgxGaugeModule,
    MatDialogModule,
    ChartsModule
  ],
  providers: [AuthService, NavService, AuthGuard, DashboardService, ChartService],
  bootstrap: [AppComponent]
})
export class AppModule { }
