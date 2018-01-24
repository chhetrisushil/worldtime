import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {UserService} from "../../services/user.service";
import {ZoneService} from "../../services/zone.service";
import {User} from "../../models/user.model";
import {Zone} from "../../models/zone.model";

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {

  selectedUser: any = {
    username: ''
  };
  isAdmin = false;
  selectedUserZones: any = [];
  model:any = {
    pwd: '',
    pwd2: ''
  }
  constructor(private activatedRoute:ActivatedRoute,
              private userService:UserService,
              private zoneService:ZoneService) { }

  ngOnInit() {
    this.isAdmin = (this.userService.currentUser.role == 2);
    this.userService.getUserById(this.activatedRoute.snapshot.params.id)
      .subscribe(
        data => {
          this.selectedUser = data;

          if (data['_id']) {
            this.zoneService.getZonesForUser(data['_id'], this.userService.currentUser.token)
              .subscribe(
                zones => {
                  this.selectedUserZones = zones;
                },
                err => {
                  console.log('error 2', err);
                }
              )
          }
        },
        error => {
          console.log('error', error);
        }
      )
  }

  editUser() {
    this.selectedUser.password = this.model.pwd;
    console.log(this.selectedUser);
    this.userService.updateUser(this.selectedUser, this.userService.currentUser.token)
      .subscribe(
        data => {
          console.log('data on put:', data)
        },
        error => {
          console.log('error on put:', error)
        }
      )
  }

  addZone() {
    let emptyZone = new Zone();
    emptyZone.owner = this.selectedUser._id;
    this.selectedUserZones.push(emptyZone);
  }

}
