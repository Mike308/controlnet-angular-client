import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ModuleModel} from '../../nav/model/module.model';
import {envDevs} from '../env.defs';
import {AuthService} from '../../auth/auth.service';
import {DictionaryModel} from '../model/dictionary.model';
import {environment} from '../../../environments/environment';
import {CommandModel} from '../model/command.model';

@Injectable()
export class ModuleService {

  constructor (private httpClient: HttpClient, private authService: AuthService) {}

  httpOptions = {
    headers: new HttpHeaders({
      'Content-type': 'application/json',
      Authorization: this.authService.token
    })
  };

  getModules(): Observable<ModuleModel[]> {
    return this.httpClient.get<ModuleModel[]>(envDevs.url + '/modules/all', this.httpOptions);
  }

  getModulesTypes(): Observable<DictionaryModel[]> {
    return this.httpClient.get<DictionaryModel[]>(environment.url + '/dictionary/modules-types', this.httpOptions);
  }

  getCommands(moduleId: number): Observable<CommandModel[]> {
    return this.httpClient.get<CommandModel[]>(environment.url + '/commands/' + moduleId);
  }

  addModule(module: ModuleModel): Observable<number> {
    return this.httpClient.post<number>(environment.url + '/modules/add-new-module', module, this.httpOptions);
  }

  addCommands(commands: CommandModel[]): Observable<void> {
    return this.httpClient.post<void>(environment.url + '/commands/add', commands, this.httpOptions);
  }
}
