import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {AuthService} from '../../auth/auth.service';

@Injectable()
export class UserService {

  constructor(private httpClient: HttpClient, private authService: AuthService) {
  }

  insertNewUser(user: { name: string, password: string, id: number }): Observable<any> {
    return this.httpClient.post<any>(environment.url + '/user/insert', user, this.authService.httpOptions);
  }
}
