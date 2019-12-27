import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AuthService} from '../../auth/auth.service';
import {Observable} from 'rxjs';
import {HubModel} from '../model/hub.model';
import {envDevs} from '../../shared/env.defs';

@Injectable()
export class DashboardService {
  constructor (private  httpClient: HttpClient, private authService: AuthService) { }

  getSensorHub(moduleId: number): Observable<HubModel> {
    return this.httpClient.get<HubModel>(envDevs.url + '/hub/module/' + moduleId, this.authService.httpOptions);
  }

  setSensorSlotName(sensorId: number, slotName: string): Observable<any> {
    return this.httpClient.post<any>(envDevs.url + '/sensor/set-slot-name', {sensorId, newName: slotName}, this.authService.httpOptions);
  }

  deleteAllMeasurmentsAndSensors(moduleId: number): Observable<void> {
    return this.httpClient.get<void>(envDevs.url + '/hub/remove-sensors/' + moduleId, this.authService.httpOptions);
  }

}
