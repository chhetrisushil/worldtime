import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {UserService} from "../../services/user.service";
import {ZoneService} from "../../services/zone.service";
import {Zone} from "../../models/zone.model";
import {TimeService} from "../../services/time.service";
import {Subscription} from "rxjs/Subscription";

@Component({
  selector: 'app-singlezone',
  templateUrl: './singlezone.component.html',
  styleUrls: ['./singlezone.component.css']
})
export class SinglezoneComponent implements OnInit, OnDestroy {

  @Input() zone:any;
  sub:Subscription;
  editMode;
  zoneTime:string;
  timeInterval = null;
  model:any = {
    offset: 0,
    city: '',
    name: '',
    editMode: false
  }

  constructor(private zoneService:ZoneService,
              private userService:UserService,
              private ts:TimeService) { }

  ngOnInit() {
    console.log('zone:', this.zone);
    if (this.zone.name === undefined) {
      this.editMode = true;
    }
    this.model.city = this.zone.city || '';
    this.model.offset = this.zone.offset || 0;
    this.model.name = this.zone.name || '';
    this.zoneTime = this.ts.convertCurrentTime(new Date(), +this.model.offset);
    this.sub = this.ts.timeUpdate.subscribe(
      (date:Date) => {
        console.log('date:', this.model.offset);
        this.zoneTime = this.ts.convertCurrentTime(date, +this.model.offset)
      }
    )
  }

  onEdit() {
    this.editMode = true;
  }

  onSave() {
    let timezone = new Zone();
    timezone.parse(this.zone);
    timezone.parse(this.model);
    let token = this.userService.currentUser.token;
    timezone._id = this.zone._id;

    this.zone._id ? this.updateZone(timezone, token) : this.addZone(timezone, token);
    // TODO call userActivated after zone is added, updated or deleted
  }

  updateZone(zone:Zone, token:string) {
    this.zoneService.updateZone(zone, token).subscribe(
      data => {
        this.editMode = false;
        this.userService.refreshZones();
      },
      error => {
      }
    )
  }

  addZone(zone:Zone, token:string) {

    this.zoneService.addZone(zone, token).subscribe(
      data => {
        this.editMode = false;
        this.zone._id = data['_id'];
        console.log('zone owner:', this.zone.owner);
        console.log('current user:', this.userService.currentUser._id);
        this.userService.currentUser.zones.push();
      },
      error => {
        console.log('error after operation:', error)
      }
    )
  }

  onDelete() {
    let token = this.userService.currentUser.token;
    this.zoneService.deleteZone(this.zone, token).subscribe(
      data => {
        this.removeZone();
      },
      error => {

      }
    )
  }

  removeZone() {
    let tempZones = this.userService.currentUser.zones.map((x)=>x._id);
    if (this.userService.currentUser._id === this.zone.owner) {
      // own zone
      this.userService.currentUser.zones.splice(tempZones.indexOf(this.zone._id), 1);
      this.userService.refreshCurrentUser();
    } else {
      this.zoneService.zonesUpdated.next(null);
    }

  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
