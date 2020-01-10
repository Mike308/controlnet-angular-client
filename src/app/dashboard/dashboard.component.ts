import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {DashboardService} from './service/dashboard.service';
import {HubModel} from './model/hub.model';
import {MatDialog, MatSnackBar} from '@angular/material';
import {PopupDateDialogComponent} from '../popup-date-dialog/popup-date-dialog.component';
import {ChartPopupDialogDataModel} from '../shared/model/chart.popup.dialog.data.model';
import {PopupSlotNameSetupComponent} from '../popup-slot-name-setup/popup-slot-name-setup.component';
import {ModuleService} from '../shared/service/module.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  moduleId: number;
  hubSensor: HubModel;
  interval: any;

  constructor(private activatedRoute: ActivatedRoute, private dashboardService: DashboardService,
              private router: Router, private popupDateDialog: MatDialog,
              private popupSlotNameSetupDialog: MatDialog, private snackBar: MatSnackBar,
              private moduleService: ModuleService) {
  }


  ngOnInit() {
    this.activatedRoute.params.subscribe(
      (params) => {
        this.moduleId = params.moduleId;
        this.loadHubSensor(params.moduleId);
        this.interval = setInterval(() => {
          this.loadHubSensor(params.moduleId);
        }, 1000);
      }
    );




  }

  loadHubSensor(moduleId: number) {
    this.dashboardService.getSensorHub(moduleId).subscribe(
      (refHubSensor) => {
        this.hubSensor = refHubSensor;
      },
      error1 => {
        console.log(error1);
      }
    );
  }


  onOpenChart(measurementType: string) {
    const dialogRef = this.popupDateDialog.open(PopupDateDialogComponent, {
      width: '500px',
      data: new ChartPopupDialogDataModel(this.moduleId, measurementType, ' ', '', '', '')
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.router.navigate(['chart', result.startDate.concat(' ', result.startTime),
        result.endDate.concat(' ', result.endTime), result.measurementType], {relativeTo: this.activatedRoute});
    });
  }

  setSensorSlotName(sensorId: number, slotName: string) {
    this.dashboardService.setSensorSlotName(sensorId, slotName).subscribe(value => {
        this.snackBar.open('Slot name changed successfully!', 'Slot sensor name setup', {duration: 500});
        this.loadHubSensor(this.moduleId);

      },
      error1 => {
        this.snackBar.open('Error!', 'Slot sensor name setup', {duration: 500});
      });
  }

  onEditModule() {
    this.router.navigate(['edit'], {relativeTo: this.activatedRoute}).catch(reason => console.log(JSON.stringify(reason)));
  }


  onOpenSlotNameSetup(slotId: number) {
    const dialogRef = this.popupSlotNameSetupDialog.open(PopupSlotNameSetupComponent, {
      width: '500px',
      data: {
        sensorId: slotId
      }
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.setSensorSlotName(result.sensorId, result.slotName);
    });
  }

  onRemoveModule() {
    this.dashboardService.deleteAllMeasurementsAndSensors(this.moduleId).subscribe(result => {
      this.deleteCommands(this.moduleId);
    }, error1 => this.snackBar.open('Error while removing measurements and sensors', 'Sensor removal', {
      duration: 2500
    }));
  }

  deleteModule(moduleId: number) {
    this.moduleService.deleteModule(moduleId).subscribe(result => {
      this.snackBar.open('Successfully removed a module', 'Module removal', {
        duration: 2500
      });
      this.moduleService.newModuleInserted.next(-1);
      this.router.navigate(['dashboard']);
    }, error1 => this.snackBar.open('Error while removing module', 'Module removal', {
      duration: 2500
    }));
  }

  deleteCommands(moduleId: number) {
    this.moduleService.deleteCommands(moduleId).subscribe(result => {
      this.deleteModule(moduleId);
    }, error1 => this.snackBar.open('Error while removing commands', 'Command removal', {
      duration: 2500
    }));
  }

}
