import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {ChartPopupDialogDataModel} from '../shared/model/chart.popup.dialog.data.model';
import {DatePipe} from '@angular/common';
import {SlotSensorModel} from '../shared/model/slot.sensor.model';
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-popup-slot-name-setup',
  templateUrl: './popup-slot-name-setup.component.html',
  styleUrls: ['./popup-slot-name-setup.component.css']
})
export class PopupSlotNameSetupComponent implements OnInit {



  constructor(public dialogRef: MatDialogRef<PopupSlotNameSetupComponent>, @Inject(MAT_DIALOG_DATA) public data: SlotSensorModel) { }

  ngOnInit() {
  }



}
