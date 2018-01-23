import { Component, OnInit } from '@angular/core';
import {UserService} from "../../services/user.service";
import {User} from "../../models/user.model";
import {NavigationStart, Router} from "@angular/router";
import {TimeService} from "../../services/time.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  userLoggedIn = false;
  userRole: string; //0: user; 1: user manager; 2: admin
  userRoleAsNumber:number;
  roles = ['User', 'User manager', 'Admin'];
  notHome = false;
  timeInterval:number;
  currentTime:string;

  constructor(private userService:UserService,
              private router:Router,
              private time:TimeService) {

  }

  ngOnInit() {
    this.userService.userActivated.subscribe(
      (currentUser:User) => {
        if (currentUser) {
          this.userLoggedIn = true;
          this.userRoleAsNumber = currentUser.role;
          this.userRole = this.roles[currentUser.role];
        } else {
          this.userLoggedIn = false;
          this.userRole = null;

        }
      }
    );

    this.router.events.subscribe(
      event => {
        if (event instanceof NavigationStart) {
          this.notHome = (event.url !== '/');
        }
      }
    );

    this.startTimeInterval();
  }

  logout() {
    this.userService.logout();
    this.router.navigate(['/']);
  }

  startTimeInterval() {
    this.timeInterval = window.setInterval(() => {
      this.currentTime = this.time.getCurrentTime();
    }, 1000);
  }
}
