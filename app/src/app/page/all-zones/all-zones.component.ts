import { Component, OnInit } from '@angular/core';
import {ZoneService} from "../../services/zone.service";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-all-zones',
  templateUrl: './all-zones.component.html',
  styleUrls: ['./all-zones.component.css']
})
export class AllZonesComponent implements OnInit {

  model:any = {
    filter:''
  }
  zones: any =[];

  constructor(private zoneService:ZoneService,
              private userService:UserService) { }

  ngOnInit() {
    this.zoneService.getAllZones(this.userService.currentUser.token)
      .subscribe(
        data => {
          console.log('zones data:', data);
          this.zones = data;
        },
        error => {
          console.log('zones error:', error);
        }
      )
  }

  onFilterUpdate() {
    console.log(this.model.filter);
  }

  onFilter() {
    this.zoneService.filterZone(this.model.filter)
      .subscribe(
        data => {
          this.zones = data;
        },
        error => {
          console.log('error')
        }
      )
  }
}
