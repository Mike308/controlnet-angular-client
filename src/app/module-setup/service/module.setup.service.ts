import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {DictionaryModel} from '../../shared/model/dictionary.model';
import {environment} from '../../../environments/environment';
import {AuthService} from '../../auth/auth.service';

@Injectable()
export class ModuleSetupService {

  constructor(private httpClient: HttpClient, private authService: AuthService) {}

  httpOptions = {
    headers: new HttpHeaders({
      'Content-type': 'application/json',
      Authorization: this.authService.token
    })
  };


  getModulesTypes(): Observable<DictionaryModel[]> {
    return this.httpClient.get<DictionaryModel[]>(environment.url + '/dictionary/modules-types', this.httpOptions);
  }

}
