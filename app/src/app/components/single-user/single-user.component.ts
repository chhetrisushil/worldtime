import { Component, OnInit, Input } from '@angular/core';
import {UserService} from "../../services/user.service";
import {Router} from "@angular/router";
import {ZoneService} from "../../services/zone.service";

@Component({
  selector: 'app-single-user',
  templateUrl: './single-user.component.html',
  styleUrls: ['./single-user.component.css']
})
export class SingleUserComponent implements OnInit {

  @Input() user:any;
  roles = ['User', 'User manager', 'Admin'];
  isCurrentUser = false;
  userZones = 0;
  constructor(private userService:UserService,
              private zoneService:ZoneService,
              private router:Router) { }

  ngOnInit() {
    console.log(this.user);
    if (this.user._id === this.userService.currentUser._id) {
      this.isCurrentUser = true;
    }
    this.zoneService.getZonesForUser(this.user._id, this.userService.currentUser.token)
      .subscribe(
        data => {
          this.userZones = data['length'];
        },
        error => {

        }
      )
  }

  onDetails() {
    let dest = this.isCurrentUser ? '/profile' : '/details/'+this.user._id;
    this.router.navigate([dest]);
  }

  onDelete() {
    this.userService.deleteUser(this.user._id, this.userService.currentUser.token)
      .subscribe(
        data => {
          this.userService.allUsers.next(null);
        },
        error => {
          console.log('error on delete:', error);
        }
      )
  }
}
