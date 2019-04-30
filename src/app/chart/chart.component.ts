import {Component, OnInit, ViewChild} from '@angular/core';
import {ChartService} from './service/chart.service';
import {ChartDataSets, ChartOptions} from 'chart.js';
import {BaseChartDirective, Color, Label} from 'ng2-charts';
import * as pluginAnnotations from 'chartjs-plugin-annotation';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {
  chartData: ChartDataSets[] =
    [{data: [0], label: 'EMPTY'}];
  dates: Label[] = [];
  public lineChartOptions: (ChartOptions & { annotation: any }) = {
    responsive: true,
    scales: {
      xAxes: [{}],
      yAxes: []
    },
    annotation: {
      annotations: [],
    },
    elements: {
      line: {
        fill: false
      }
    }
  };
  public lineChartColors: Color[] = [];
  public lineChartLegend = true;
  public lineChartType = 'line';
  public lineChartPlugins = [pluginAnnotations];
  @ViewChild(BaseChartDirective) chart: BaseChartDirective;


  constructor(private chartService: ChartService) {
  }

  ngOnInit() {
    this.chartService.getTemperatures(5, ' ', '').subscribe(
      (value) => {
        this.chartData = this.chartService.mapDataToChartData(value);
        console.log(JSON.stringify(this.chartData));
        this.dates = this.chartService.getDateForXAxis(value);
      },
      error1 => console.log(error1));
  }
}


