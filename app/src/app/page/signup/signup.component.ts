import { Component, OnInit } from '@angular/core';
import {UserService} from "../../services/user.service";
import {User} from "../../models/user.model";
import {Router} from "@angular/router";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  model: any = {
    username:'',
    pwd:'',
    pwd2:'',
    role: 0
  };
  invalidUsername = false;
  invalidPassword = false;
  empty = false;

  constructor(private userService:UserService,
              private router:Router) { }

  ngOnInit() {
  }

  register() {
    if (this.model.username === '' ||
        this.model.pwd === '' ||
        this.model.pwd2 === '') {
      this.empty = true;
      return;
    }

    let a = new User();
    a.parse(this.model);
    this.userService.createNewUser(a, this.model.pwd)
      .subscribe(
        data => {
          console.log(data);
          if (data['auth']) {
            let user = new User();
            user.parse(data);
            console.log('set current user after signup:', user);
            this.userService.setCurrentUser(user);
            this.router.navigate(['/zones']);
          }
        },
        error => {
          console.log('on err:', error)
          this.invalidUsername = true;
        }
      )
  }

}
