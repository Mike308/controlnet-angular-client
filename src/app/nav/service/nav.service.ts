import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ModuleModel} from '../model/module.model';
import {envDevs} from '../../shared/env.defs';
import {AuthService} from '../../auth/auth.service';

@Injectable()
export class NavService {
  constructor(private httpClient: HttpClient, private  authService: AuthService) { }


  httpOptions = {
    headers: new HttpHeaders({
      'Content-type': 'application/json',
      'Authorization': this.authService.token
    })
  };

  getModules(): Observable<ModuleModel[]> {
    return this.httpClient.get<ModuleModel[]>(envDevs.url + '/modules/all', this.httpOptions);
  }

}
