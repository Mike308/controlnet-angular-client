import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {
  MatButtonModule,
  MatCardModule, MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatFormFieldModule,
  MatInputModule,
  MatListModule,
  MatNativeDateModule,
  MatOptionModule,
  MatSelectModule,
  MatSnackBarModule,
  MatStepperModule,
  MatTableModule,
  MatToolbarModule,
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
import {AppRoutingModule} from './app.routing.module';
import {AuthGuard} from './guard/auth.guard';
import {DashboardService} from './dashboard/service/dashboard.service';
import {GaugesModule} from 'ng-canvas-gauges';
import {NgxGaugeModule} from 'ngx-gauge';
import { ChartComponent } from './chart/chart.component';
import {ChartService} from './chart/service/chart.service';
import {ChartsModule} from 'ng2-charts';
import { PopupDateDialogComponent } from './popup-date-dialog/popup-date-dialog.component';
import {DatePipe} from '@angular/common';
import { PopupSlotNameSetupComponent } from './popup-slot-name-setup/popup-slot-name-setup.component';
import { CommandComponent } from './command/command.component';
import { ModuleSetupComponent } from './module-setup/module-setup.component';
import { ModulePanelComponent } from './module-panel/module-panel.component';
import {ModuleService} from './shared/service/module.service';
import { HeaderComponent } from './header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    IndexComponent,
    NavComponent,
    DashboardComponent,
    ChartComponent,
    PopupDateDialogComponent,
    PopupSlotNameSetupComponent,
    CommandComponent,
    ModuleSetupComponent,
    ModulePanelComponent,
    HeaderComponent
  ],
  entryComponents: [DashboardComponent, PopupDateDialogComponent, PopupSlotNameSetupComponent, CommandComponent],
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
    ChartsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSnackBarModule,
    MatStepperModule,
    MatSelectModule,
    MatOptionModule,
    MatTableModule,
    MatToolbarModule,
    MatCheckboxModule
  ],
  providers: [AuthService, AuthGuard, DashboardService, ChartService, ModuleService, DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
