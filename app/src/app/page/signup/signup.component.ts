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

  constructor(private userService:UserService,
              private router:Router) { }

  ngOnInit() {
  }

  register() {
    let a = new User();
    console.log('model:', this.model);
    a.parse(this.model);
    this.userService.createNewUser(a, this.model.pwd)
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
