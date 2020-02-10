import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import {UserModel} from './model/user.model';
import {JwtHelperService} from '@auth0/angular-jwt';
import {Router} from '@angular/router';


@Injectable()
export class AuthService {

  token: string;
  apiUrl = 'http://localhost:8080';
  ifLoggedIn = false;
  loginStatus = new Subject<UserModel>();
  username: string;
  password: string;
  userId: number;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-type': 'application/json',
      Authorization: this.token
    })
  };



  constructor(private httpClient: HttpClient, private router: Router) {
  }

  loginUser(name: string, password: string) {
    const helper = new JwtHelperService();
    this.performRequest(name, password).subscribe(
      (result) => {
        this.loginStatus.next(new UserModel(name, true, '  '));
        this.token = result.token;
        this.ifLoggedIn = true;
        this.username = name;
        this.password = password;
        console.log('Json: ' + JSON.stringify(helper.decodeToken(this.token)));
        this.userId = helper.decodeToken(this.token).userId;
        this.httpOptions = {
          headers: new HttpHeaders({
            'Content-type': 'application/json',
            Authorization: result.token
          })
        };

      },
      error1 => this.loginStatus.next(new UserModel(' ', false, ' '))
    );
  }

  logout() {
    this.loginStatus.next({name: '', ifLoggedIn: false, role: ''});
    this.router.navigate(['login']);
  }

  private performRequest(name: string, password: string): Observable<any> {
    return this.httpClient.post(this.apiUrl + '/login', {
      name,
      password
    });
  }
}

