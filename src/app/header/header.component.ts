import { Component, OnInit } from '@angular/core';
import {AuthService} from '../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  ifLoggedIn = false;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authService.loginStatus.subscribe(result => {
      this.ifLoggedIn = result.ifLoggedIn;
    });
  }

  logout() {
    this.authService.logout();
  }
}
