import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import {ModuleModel} from '../model/module.model';
import {envDevs} from '../env.defs';
import {AuthService} from '../../auth/auth.service';
import {DictionaryModel} from '../model/dictionary.model';
import {environment} from '../../../environments/environment';
import {CommandModel} from '../model/command.model';

@Injectable()
export class ModuleService {

  newModuleInserted = new Subject<number>();

  constructor(private httpClient: HttpClient, private authService: AuthService) {
  }

  getModules(): Observable<ModuleModel[]> {
    return this.httpClient.get<ModuleModel[]>(envDevs.url + '/modules/all', this.authService.httpOptions);
  }

  getModule(moduleId: number): Observable<ModuleModel> {
    return this.httpClient.get<ModuleModel>(envDevs.url + '/modules/module/' + moduleId, this.authService.httpOptions);
  }

  deleteModule(moduleId: number): Observable<void> {
    return this.httpClient.get<void>(envDevs.url + '/modules/delete-module/' + moduleId, this.authService.httpOptions);
  }

  getModulesTypes(): Observable<DictionaryModel[]> {
    return this.httpClient.get<DictionaryModel[]>(environment.url + '/dictionary/modules-types', this.authService.httpOptions);
  }

  getCommands(moduleId: number): Observable<CommandModel[]> {
    return this.httpClient.get<CommandModel[]>(environment.url + '/commands/' + moduleId, this.authService.httpOptions);
  }

  addModule(module: ModuleModel): Observable<number> {
    return this.httpClient.post<number>(environment.url + '/modules/add-new-module', module, this.authService.httpOptions);
  }

  addCommands(commands: CommandModel): Observable<CommandModel> {
    return this.httpClient.post<CommandModel>(environment.url + '/commands/add', commands, this.authService.httpOptions);
  }

  deleteCommand(id: number): Observable<void> {
    return this.httpClient.get<void>(environment.url + '/commands/delete/' + id, this.authService.httpOptions);
  }

  deleteCommands(moduleId: number): Observable<void> {
    return this.httpClient.get<void>(environment.url + '/commands/delete-all/' + moduleId, this.authService.httpOptions);
  }


}
