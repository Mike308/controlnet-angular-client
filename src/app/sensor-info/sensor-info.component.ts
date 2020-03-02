import {Component, Inject, OnInit} from '@angular/core';
import {SensorService} from './service/sensor.service';
import {SensorModel} from './model/sensor.model';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-sensor-info',
  templateUrl: './sensor-info.component.html',
  styleUrls: ['./sensor-info.component.css']
})
export class SensorInfoComponent implements OnInit {

  sensor: SensorModel;

  constructor(private sensorService: SensorService, public dialogRef: MatDialogRef<SensorInfoComponent>, @Inject(MAT_DIALOG_DATA) public sensorId: number) { }

  ngOnInit() {
    this.sensorService.getSensorInfo(this.sensorId).subscribe(result => {
      this.sensor = result;
      console.log('Result: ' + JSON.stringify(result));
    });
  }

  onClose() {
    this.dialogRef.close();
  }
}
