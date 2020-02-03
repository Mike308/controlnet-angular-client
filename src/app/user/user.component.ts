import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UserService} from './service/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  userForm: FormGroup;

  constructor(private userService: UserService) {
  }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.userForm = new FormGroup({
      name: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }

  onUserUpdate() {
    this.userService.insertNewUser({
      name: this.userForm.value.name,
      password: this.userForm.value.password
    }).subscribe(result => {
      console.log(JSON.stringify(result));
    }, error1 => {
      console.log('Error: ' + JSON.stringify(error1));
    });
  }
}
