import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {DashboardService} from './service/dashboard.service';
import {HubModel} from './model/hub.model';
import {MatDialog} from '@angular/material';
import {PopupDateDialogComponent} from '../popup-date-dialog/popup-date-dialog.component';
import {ChartPopupDialogDataModel} from '../shared/model/chart.popup.dialog.data.model';
import {PopupSlotNameSetupComponent} from '../popup-slot-name-setup/popup-slot-name-setup.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  moduleId: number;
  hubSensor: HubModel;

  constructor(private activatedRoute: ActivatedRoute, private dashboardService: DashboardService,
              private router: Router, private popupDateDialog: MatDialog, private popupSlotNameSetupDialog: MatDialog) {
  }


  ngOnInit() {
    this.activatedRoute.params.subscribe(
      (params) => {
        this.moduleId = params.moduleId;
        this.dashboardService.getSensorHub(params.moduleId).subscribe(
          (result) => this.hubSensor = result,
          error1 => {
            console.log(error1);
          }
        );
      }
    );
  }


  onOpenChart(measurementType: string){
    const dialogRef = this.popupDateDialog.open(PopupDateDialogComponent, {
      width: '500px',
      data: new ChartPopupDialogDataModel(this.moduleId, measurementType, ' ', '', '', '')
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('Result: ' + JSON.stringify(result));
      this.router.navigate(['chart', result.startDate.concat(' ', result.startTime),
        result.endDate.concat(' ', result.endTime), result.measurementType], {relativeTo: this.activatedRoute});
    });
  }


  onOpenSlotNameSetup(slotId: number) {
    const dialogRef = this.popupSlotNameSetupDialog.open(PopupSlotNameSetupComponent, {
      width: '500px',
      data: {
        sensorId: slotId
      }
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log('Result: ' + JSON.stringify(result));
    });
  }
}
