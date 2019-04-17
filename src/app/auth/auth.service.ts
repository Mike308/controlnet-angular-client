import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import {UserModel} from './model/user.model';
import {any} from 'codelyzer/util/function';

@Injectable()
export class AuthService {

  token: string;
  apiUrl = 'http://localhost:8080';
  loginStatus = new Subject<UserModel>();

  constructor(private httpClient: HttpClient) {
  }

  loginUser(name: string, password: string) {
    this.performRequest(name, password).subscribe(
      (result) => {
        this.loginStatus.next(new UserModel(name, true, '  '));
        this.token = result.token;
        console.log('Token: ' + result.token);
      },
        error1 => this.loginStatus.next(new UserModel(' ', false, ' '))
    );
  }

  private performRequest(name: string, password: string): Observable<any> {
    return this.httpClient.post(this.apiUrl + '/login', {
      name,
      password
    });
  }
}

