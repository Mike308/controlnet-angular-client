import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AuthService} from '../../auth/auth.service';
import {Observable} from 'rxjs';
import {HubModel} from '../model/hub.model';
import {envDevs} from '../../shared/env.defs';

@Injectable()
export class DashboardService {
  constructor (private  httpClient: HttpClient, private authService: AuthService) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-type': 'application/json',
      'Authorization': this.authService.token
    })
  };

  getSensorHub(moduleId: number): Observable<HubModel> {
    return this.httpClient.get<HubModel>(envDevs.url + '/hub/module/' + moduleId, this.httpOptions);
  }

}
