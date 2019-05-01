export class ChartPopupDialogDataModel {
  moduleId: number;
  measurementType: string;
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;

  constructor(moduleId: number, measurementType: string, startDate: string, endDate: string, startTime: string, endTime: string) {
    this.moduleId = moduleId;
    this.measurementType = measurementType;
    this.startDate = startDate;
    this.endDate = endDate;
    this.startTime = startTime;
    this.endTime = endTime;
  }
}



