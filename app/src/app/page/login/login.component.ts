import { Component, OnInit } from '@angular/core';
import {UserService} from "../../services/user.service";
import {Router} from "@angular/router";
import {ZoneService} from "../../services/zone.service";

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
  invalid = false;

  constructor(private userService:UserService,
              private zoneService:ZoneService,
              private router:Router) { }

  ngOnInit() {
  }

  doLogin() {
    //.body.username
    //.body.password
    this.userService.login(this.model.username, this.model.password)
      .subscribe(
        data => {
          if (data['auth']) {
            this.userService.setCurrentUser(data);
            this.zoneService.getZonesForCurrentUser(
                 this.userService.currentUser._id,
                 this.userService.currentUser.token)
              .subscribe(
                (zones:Object) => {
                  this.userService.currentUser.zones = zones;
                  this.userService.refreshCurrentUser();
                  this.router.navigate(['/zones']);
                },
                error => {

                }
              )

          }
        },
        error => {
          console.log('on err:', error);
          this.invalid = true;
        }
      )
  }

}
