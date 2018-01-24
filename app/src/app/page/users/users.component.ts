import { Component, OnInit } from '@angular/core';
import {UserService} from "../../services/user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users:any;

  constructor(private userService:UserService,
              private router:Router) { }

  ngOnInit() {
    this.refreshUsersList();
    this.userService.allUsers.subscribe(
      (ev:any) => {
        this.refreshUsersList();
      }
    )
  }

  refreshUsersList() {
    this.userService.getAllUsers()
      .subscribe(
        data => {
          this.users = data;
        },
        error => {
          console.log('error on get all users:', error);
        }
      )
  }

  onAddUser() {
    this.router.navigate(['/newuser']);
  }

}
