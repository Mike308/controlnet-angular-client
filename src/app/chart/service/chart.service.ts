import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AuthService} from '../../auth/auth.service';
import {Observable} from 'rxjs';
import {TemperatureModel} from '../model/temperature.model';
import {envDevs} from '../../shared/env.defs';
import {ChartDataModel} from '../model/chart.data.model';

@Injectable()
export class ChartService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-type': 'application/json',
      'Authorization': this.authService.token
    })
  };

  constructor(private  httpClient: HttpClient, private authService: AuthService) {
  }

  getTemperatures(moduleId: number, startDate: string, endDate: string): Observable<TemperatureModel[]> {
    return this.httpClient.get<TemperatureModel[]>(envDevs.url +
      '/temperatures/module-id/1/start-date/2019-02-13 19:00/end-date/2019-02-13 20:01', this.httpOptions);
  }

  mapDataToChartData(temperatures: TemperatureModel[]): any {
    const chartData: ChartDataModel[] = [];
    const slotNames = temperatures.map(value => {
      return {slotName: value.slotName, sensorId: value.sensorId};
    }).filter((value, index, array) => {
      return array.indexOf(array.find(t => t.sensorId === value.sensorId)) === index;
    });
    slotNames.forEach(sensor => {
      const temperaturesOfSlot = temperatures.filter(x => x.sensorId === sensor.sensorId).map(value1 => {
        return value1.temperature;
      });
      chartData.push(new ChartDataModel(sensor.slotName, temperaturesOfSlot));
    });
    return chartData;
  }

  getDateForXAxis(data: any[]): any {
    return  data.map(value => {
      return value.date;
    }).filter((value, index, array) => {
      return array.indexOf(array.find(t => t === value)) === index;
    });
  }


}
