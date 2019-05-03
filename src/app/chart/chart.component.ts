import {Component, OnInit, ViewChild} from '@angular/core';
import {ChartService} from './service/chart.service';
import {ChartDataSets, ChartOptions} from 'chart.js';
import {BaseChartDirective, Color, Label} from 'ng2-charts';
import * as pluginAnnotations from 'chartjs-plugin-annotation';
import {ActivatedRoute} from '@angular/router';

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


  constructor(private chartService: ChartService, private activatedRouter: ActivatedRoute) {
  }

  ngOnInit() {

    this.activatedRouter.params.subscribe((params) => {
      console.log(JSON.stringify(params));
      if (params.measurementType === 'T') {
        this.mapTemperatureToDataChart(params.moduleId, params.startDate, params.endDate);
      } else if (params.measurementType === 'H') {
        this.mapHumidityMeasurementsToDataChart(params.moduleId, params.startDate, params.endDate);
      } else if (params.measurementType === 'LX') {
        this.mapLightIntensityMeasurementsToDataChart(params.moduleId, params.startDate, params.endDate);
      }
    });
  }

  private mapTemperatureToDataChart(moduleId: number, startDate: string, endDate: string) {
    this.chartService.getTemperatures(moduleId, startDate, endDate).subscribe(
      (value) => {
        this.chartData = this.chartService.mapTemperaturesToChartData(value);
        console.log(JSON.stringify(this.chartData));
        this.dates = this.chartService.getDateForXAxis(value);
      },
      error1 => console.log(error1));
  }

  private mapHumidityMeasurementsToDataChart(moduleId: number, startDate: string, endDate: string) {
    this.chartService.getHumidityMeasurements(moduleId, startDate, endDate).subscribe(
      (value) => {
        this.chartData = this.chartService.mapHumidityMeasurementsToChartData(value);
        console.log(JSON.stringify(this.chartData));
        this.dates = this.chartService.getDateForXAxis(value);
      },
      error1 => console.log(error1));
  }

  private mapLightIntensityMeasurementsToDataChart(moduleId: number, startDate: string, endDate: string) {
    this.chartService.getLightIntensityMeasurements(moduleId, startDate, endDate).subscribe(
      (value) => {
        this.chartData = this.chartService.mapLightIntensityMeasurementsToChartData(value);
        console.log(JSON.stringify(this.chartData));
        this.dates = this.chartService.getDateForXAxis(value);
      },
      error1 => console.log(error1));
  }

}

