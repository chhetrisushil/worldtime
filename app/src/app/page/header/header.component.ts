import { Component, OnInit } from '@angular/core';
import {UserService} from "../../services/user.service";
import {User} from "../../models/user.model";
import {NavigationStart, Router} from "@angular/router";
import {TimeService} from "../../services/time.service";
import {Subscription} from "rxjs/Subscription";

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
  sub:Subscription;
  currentTime:string;

  constructor(private userService:UserService,
              private router:Router,
              private ts:TimeService) {

  }

  ngOnInit() {
    console.log(this.userService.currentUser);
    if (this.userService.currentUser) {
      this.userLoggedIn = true;
      this.userRoleAsNumber = this.userService.currentUser.role;
      this.userRole = this.roles[this.userService.currentUser.role];
    }
    this.userService.userActivated.subscribe(
      (currentUser:User) => {
        console.log('header:', currentUser);
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

    this.sub = this.ts.timeUpdate.subscribe(
      (date:Date) => {
        this.currentTime = this.ts.convertCurrentTime(date)
      }
    )

    this.router.events.subscribe(
      event => {
        if (event instanceof NavigationStart) {
          this.notHome = (event.url !== '/');
        }
      }
    );
  }

  onHomeClick() {
    let dest = this.userService.currentUser ? '/zones' : '/';
    this.router.navigate([dest]);
  }

  logout() {
    this.userService.logout();
    this.userLoggedIn = false;
    this.userRoleAsNumber = null;
    this.userRole = null;
    this.router.navigate(['/']);
  }
}
