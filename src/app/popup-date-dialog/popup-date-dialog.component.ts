import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDatepickerInputEvent, MatDialogRef} from '@angular/material';
import {ChartPopupDialogDataModel} from '../shared/model/chart.popup.dialog.data.model';
import {DatePipe} from '@angular/common';
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-popup-date-dialog',
  templateUrl: './popup-date-dialog.component.html',
  styleUrls: ['./popup-date-dialog.component.css']
})
export class PopupDateDialogComponent implements OnInit {

  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
  startDateControl = new FormControl(' ', Validators.required);
  endDateControl = new FormControl(' ', Validators.required);


  constructor(public dialogRef: MatDialogRef<PopupDateDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: ChartPopupDialogDataModel, private datePipe: DatePipe) {
  }

  ngOnInit() {

  }


  onStartDateChange(event: MatDatepickerInputEvent<Date>) {
    this.data.startDate = this.datePipe.transform(event.value.toString(), 'yyyy-MM-dd');
  }

  onEndDateChange(event: MatDatepickerInputEvent<Date>) {
    this.data.endDate = this.datePipe.transform(event.value.toString(), 'yyyy-MM-dd');
  }

  onEndTimeChange(value: any) {
    this.data.endTime = value;
  }

  onStartTimeChange(value: any) {
    this.data.startTime = value;
  }
}
