import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {SensorModel} from '../model/sensor.model';
import {environment} from '../../../environments/environment';
import {AuthService} from '../../auth/auth.service';

@Injectable()
export class SensorService {
  constructor(private httpClient: HttpClient, private authService: AuthService) {
  }

  getSensorInfo(sensorId: number): Observable<SensorModel> {
    return this.httpClient.get<SensorModel>(environment.url + '/sensor/info/' + sensorId, this.authService.httpOptions);
  }

}
