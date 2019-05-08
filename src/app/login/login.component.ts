import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../auth/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  loginStatusSubscription: Subscription;
  loginForm: FormGroup;

  constructor(private authService: AuthService, private router: Router) {
  }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.loginForm = new FormGroup({
      userName: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }

  ngOnDestroy(): void {
    if (this.loginStatusSubscription){
      this.loginStatusSubscription.unsubscribe();
    }
  }

  onLogin() {
    this.authService.loginUser(this.loginForm.value.userName, this.loginForm.value.password);
    console.log('Login: ' + this.loginForm.value.userName);
    console.log('Password:' + this.loginForm.value.password);
    this.loginStatusSubscription = this.authService.loginStatus.subscribe(
      (loginStatus) => {
        if (loginStatus.ifLoggedIn) {
          this.router.navigate(['dashboard']);
        } else {
          console.log('Wrong password');
        }
      }
    );
  }
}
