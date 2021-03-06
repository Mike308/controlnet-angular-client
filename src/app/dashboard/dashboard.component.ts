import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {DashboardService} from './service/dashboard.service';
import {HubModel} from './model/hub.model';
import {MatDialog, MatSnackBar} from '@angular/material';
import {PopupDateDialogComponent} from '../popup-date-dialog/popup-date-dialog.component';
import {ChartPopupDialogDataModel} from '../shared/model/chart.popup.dialog.data.model';
import {PopupSlotNameSetupComponent} from '../popup-slot-name-setup/popup-slot-name-setup.component';
import {ModuleService} from '../shared/service/module.service';
import {SensorInfoComponent} from '../sensor-info/sensor-info.component';
import {TemperatureModel} from './model/temperature.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {

  moduleId: number;
  hubSensor: HubModel;
  interval: any;
  timeout: any;
  isAnimating = false;

  constructor(private activatedRoute: ActivatedRoute, private dashboardService: DashboardService,
              private router: Router, private popupDateDialog: MatDialog, private popupSensorInfoDialog: MatDialog,
              private popupSlotNameSetupDialog: MatDialog, private snackBar: MatSnackBar,
              private moduleService: ModuleService) {
  }


  ngOnInit() {
    this.activatedRoute.params.subscribe(
      (params) => {
        this.moduleId = params.moduleId;
        this.loadHubSensor(params.moduleId);
        this.isAnimating = true;
        clearInterval(this.interval);
        clearTimeout(this.timeout);
        this.timeout = setTimeout(() => {
          this.isAnimating = false;
          console.log('Stop animation');
          this.interval = setInterval(() => {
            console.log('Loading data');
            // this.loadHubSensor(this.moduleId);
            this.updateHubSensor(this.moduleId);
          }, 4000);
        }, 3000);
      }
    );


  }

  ngOnDestroy(): void {
    clearInterval(this.interval);
    clearTimeout(this.timeout);
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

  onSensorInfoOpenDialog(sensorId: number) {
    const dialogRef = this.popupSensorInfoDialog.open(SensorInfoComponent, {
      width: '500px',
      data: sensorId
    });
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

  updateHubSensor(moduleId: number) {
    this.dashboardService.getSensorHub(moduleId).subscribe(value => {
      for (let i = 0; i < this.hubSensor.temperatures.length; i++) {
        const temperatureData = value.temperatures.find(temperature => temperature.sensorId === this.hubSensor.temperatures[i].sensorId);
        this.hubSensor.temperatures[i].temperature = temperatureData.temperature;
        this.hubSensor.temperatures[i].slotName = temperatureData.slotName;
      }

      for (let i = 0; i < this.hubSensor.humidityMeasurements.length; i++) {
        const humidityMeasurementData = value.humidityMeasurements.find(humidityMeasurement => humidityMeasurement.sensorId === this.hubSensor.humidityMeasurements[i].sensorId);
        this.hubSensor.humidityMeasurements[i].humidity = humidityMeasurementData.humidity;
        this.hubSensor.humidityMeasurements[i].slotName = humidityMeasurementData.slotName;
      }

      for (let i = 0; i < this.hubSensor.lightIntensityMeasurements.length; i++) {
        const lightIntensityData = value.lightIntensityMeasurements.find(lightIntensity => lightIntensity.sensorId === this.hubSensor.lightIntensityMeasurements[i].sensorId);
        this.hubSensor.lightIntensityMeasurements[i].lightIntensity = lightIntensityData.lightIntensity;
        this.hubSensor.lightIntensityMeasurements[i].slotName = lightIntensityData.slotName;
      }
    });
  }

}
