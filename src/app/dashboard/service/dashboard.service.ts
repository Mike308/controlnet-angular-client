import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AuthService} from '../../auth/auth.service';
import {Observable} from 'rxjs';
import {HubModel} from '../model/hub.model';
import {environment} from '../../../environments/environment';

@Injectable()
export class DashboardService {
  constructor (private  httpClient: HttpClient, private authService: AuthService) { }

  getSensorHub(moduleId: number): Observable<HubModel> {
    return this.httpClient.get<HubModel>(environment.url + '/hub/module/' + moduleId, this.authService.httpOptions);
  }

  setSensorSlotName(sensorId: number, slotName: string): Observable<any> {
    return this.httpClient.post<any>(environment.url + '/sensor/set-slot-name', {sensorId, newName: slotName}, this.authService.httpOptions);
  }

  deleteAllMeasurementsAndSensors(moduleId: number): Observable<void> {
    return this.httpClient.get<void>(environment.url + '/hub/remove-sensors/' + moduleId, this.authService.httpOptions);
  }

}
