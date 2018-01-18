import { Component, OnInit } from '@angular/core';
import {UserService} from "../../services/user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  model:any = {
    username:'',
    password:''
  };

  constructor(private userService:UserService,
              private router:Router) { }

  ngOnInit() {
  }

  doLogin() {
    //.body.username
    //.body.password
    this.userService.login(this.model.username, this.model.password)
      .subscribe(
        data => {
          console.log('on data:', data);
          if (data['auth']) {
            console.log('authenticated!');
            this.userService.setCurrentUser(data);
            this.router.navigate(['/zones']);
          }
        },
        error => {
          console.log('on err:', error)
        }
      )
  }

}
