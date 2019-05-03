import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AuthService} from '../../auth/auth.service';
import {Observable} from 'rxjs';
import {TemperatureModel} from '../model/temperature.model';
import {envDevs} from '../../shared/env.defs';
import {ChartDataModel} from '../model/chart.data.model';
import {HumidityMeasurementModel} from '../model/humidity.measurement.model';
import {LightIntensityMeasurementModel} from '../model/light.intensity.measurement.model';

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
      '/temperatures/module-id/' + moduleId + '/start-date/' + startDate + '/end-date/' + endDate, this.httpOptions);
  }

  getHumidityMeasurements(moduleId: number, startDate: string, endDate: string): Observable<HumidityMeasurementModel[]> {
    return this.httpClient.get<HumidityMeasurementModel[]>(envDevs.url +
      '/humidity/module-id/' + moduleId + '/start-date/' + startDate + '/end-date/' + endDate, this.httpOptions);
  }

  getLightIntensityMeasurements(moduleId: number, startDate: string, endDate: string): Observable<LightIntensityMeasurementModel[]> {
    return this.httpClient.get<LightIntensityMeasurementModel[]>(envDevs.url +
      '/light-intensity/module-id/' + moduleId + '/start-date/' + startDate + '/end-date/' + endDate, this.httpOptions);
  }

  mapTemperaturesToChartData(temperatures: TemperatureModel[]): any {
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

  mapHumidityMeasurementsToChartData(humidityMeasurements: HumidityMeasurementModel[]): any {
    const chartData: ChartDataModel[] = [];
    const slotNames = humidityMeasurements.map(value => {
      return {slotName: value.slotName, sensorId: value.sensorId};
    }).filter((value, index, array) => {
      return array.indexOf(array.find(t => t.sensorId === value.sensorId)) === index;
    });
    slotNames.forEach(sensor => {
      const humidityMeasurementsOfSlot = humidityMeasurements.filter(x => x.sensorId === sensor.sensorId).map(value1 => {
        return value1.humidity;
      });
      chartData.push(new ChartDataModel(sensor.slotName, humidityMeasurementsOfSlot));
    });
    return chartData;
  }

  mapLightIntensityMeasurementsToChartData(lightIntensityMeasurements: LightIntensityMeasurementModel[]): any {
    const chartData: ChartDataModel[] = [];
    const slotNames = lightIntensityMeasurements.map(value => {
      return {slotName: value.slotName, sensorId: value.sensorId};
    }).filter((value, index, array) => {
      return array.indexOf(array.find(t => t.sensorId === value.sensorId)) === index;
    });
    slotNames.forEach(sensor => {
      const lightIntensityMeasurementsOfSlot = lightIntensityMeasurements.filter(x => x.sensorId === sensor.sensorId).map(value1 => {
        return value1.lightIntensity;
      });
      chartData.push(new ChartDataModel(sensor.slotName, lightIntensityMeasurementsOfSlot));
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
