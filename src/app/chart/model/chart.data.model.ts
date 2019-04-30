export class ChartDataModel {
  label: string;
  data: number[] = [];
  fill: false;


  constructor(label: string, data: number[]) {
    this.label = label;
    this.data = data;
  }
}
