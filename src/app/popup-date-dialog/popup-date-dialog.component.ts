import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDatepickerInputEvent, MatDialogRef} from '@angular/material';
import {ChartPopupDialogDataModel} from '../shared/model/chart.popup.dialog.data.model';

@Component({
  selector: 'app-popup-date-dialog',
  templateUrl: './popup-date-dialog.component.html',
  styleUrls: ['./popup-date-dialog.component.css']
})
export class PopupDateDialogComponent implements OnInit {

  startDate: string;
  endDate: string;

  constructor(public dialogRef: MatDialogRef<PopupDateDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: ChartPopupDialogDataModel) {
  }

  ngOnInit() {

  }

  onAccept() {
    console.log('Start date: ' + this.startDate);
    console.log('End date: ' + this.endDate);
    console.log(JSON.stringify(this.data));
  }

  onStartDateChange(event: MatDatepickerInputEvent<Date>) {
    this.startDate = event.value.toString();
  }

  onEndDateChange(event: MatDatepickerInputEvent<Date>) {
    this.endDate = event.value.toString();
  }
}
