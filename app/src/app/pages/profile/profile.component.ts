import { Component, OnInit } from '@angular/core';
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user:any;
  model = {
    old: '',
    p1: '',
    p2: ''
  }
  invalidPassword = false;
  passDoesntMatch = false;
  passChangeSuccess = false;
  serverError = false;
  constructor(private userService:UserService) { }

  ngOnInit() {
    this.user = this.userService.currentUser;
  }

  reset() {
    this.model = {
      old: '',
      p1: '',
      p2: ''
    }
  }
  onChangePassword() {
    if (this.model.p1 !== this.model.p2) {
      this.passDoesntMatch = true;
    }
    this.userService.login(this.user.username, this.model.old)
      .subscribe(
        data => {
          if (data['auth']) {
            // user+password correct
            this.user.password = this.model.p1;
            this.userService.updateUser(this.user, this.userService.currentUser.token)
              .subscribe(
                data => {
                  console.log('data after pwd change:', data);
                  this.passChangeSuccess = true;
                  this.reset();
                },
                error => {
                  console.log('error after pwd change:', error)
                  this.reset();
                  this.serverError = true;
                }
              )
          } else {
            // old password incorrect
            console.log('invalid password')
          }
        },
        error => {
          // user - password combination incorrect
          console.log('invalid old password');
          this.reset();
          this.invalidPassword = true;
        }
      )
  }

}
