import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {UserService} from "../../services/user.service";
import {User} from "../../models/user.model";
import {Zone} from "../../models/zone.model";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  zones = [];

  constructor(private userService:UserService,
              private changeRef:ChangeDetectorRef) { }

  ngOnInit() {
    this.zones = this.userService.currentUser.zones || [];
    this.userService.userActivated.subscribe(
      (currentUser:User) => {
        if (currentUser) {
          this.zones = currentUser.zones || [];
          console.log('zones:', this.zones);
          //this.changeRef.detectChanges();
        }
      }
    )
  }

  addZone() {
    let emptyZone = new Zone();
    this.zones.push(emptyZone);
    console.log(this.zones);
  }

}
