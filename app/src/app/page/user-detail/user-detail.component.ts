import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {UserService} from "../../services/user.service";
import {ZoneService} from "../../services/zone.service";

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {

  selectedUser: any;
  selectedUserZones: any;
  constructor(private activatedRoute:ActivatedRoute,
              private userService:UserService,
              private zoneService:ZoneService) { }

  ngOnInit() {
    console.log('user details component:', this.activatedRoute.snapshot.params);
    this.userService.getUserById(this.activatedRoute.snapshot.params.id)
      .subscribe(
        data => {
          console.log('data after getuserbyid:', data);
          if (data['_id']) {
            this.zoneService.getZonesForUser(data['_id'], this.userService.currentUser.token)
              .subscribe(
                zones => {
                  console.log('zones by selected user:', zones)
                },
                err => {
                  console.log('error on getting zones:', err)
                }
              )
          }
        },
        error => {
          console.log('error', error);
        }
      )
  }

}
