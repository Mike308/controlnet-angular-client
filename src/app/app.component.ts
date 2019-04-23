import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from './auth/auth.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy{
  title = 'controlnet-angular-client';
  loginStatusSubscription: Subscription;
  ifLoggedIn = false;

  constructor (private authService: AuthService) {

  }

  ngOnInit(): void {
    this.loginStatusSubscription = this.authService.loginStatus.subscribe(
      (loginStatus) => {
        this.ifLoggedIn = loginStatus.ifLoggedIn;
      }
    );
  }

  ngOnDestroy(): void {
    this.loginStatusSubscription.unsubscribe();
  }
}



