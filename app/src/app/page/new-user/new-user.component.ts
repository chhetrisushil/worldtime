import { Component, OnInit } from '@angular/core';
import {User} from "../../models/user.model";
import {UserService} from "../../services/user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.css']
})
export class NewUserComponent implements OnInit {

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

  createUser() {
    let a = new User();
    a.parse(this.model);
    this.userService.createNewUser(a, this.model.pwd)
      .subscribe(
        data => {
          if (data['auth']) {
            this.userService.setCurrentUser(data);
            this.router.navigate(['/users']);
          }
        },
        error => {
          console.log('on err:', error)
        }
      )
  }

}
