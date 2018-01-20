import {Component, Input, OnInit} from '@angular/core';
import {UserService} from "../../services/user.service";
import {ZoneService} from "../../services/zone.service";
import {Zone} from "../../models/zone.model";

@Component({
  selector: 'app-singlezone',
  templateUrl: './singlezone.component.html',
  styleUrls: ['./singlezone.component.css']
})
export class SinglezoneComponent implements OnInit {

  @Input() zone:any;
  editMode;
  model:any = {
    offset: '',
    city: '',
    name: '',
    editMode: false
  }

  constructor(private zoneService:ZoneService,
              private userService:UserService) { }

  ngOnInit() {
    if (this.zone.name === undefined) {
      this.editMode = true;
    }
    this.model.city = this.zone.city || '';
    this.model.offset = this.zone.offset || '';
    this.model.name = this.zone.name || '';
  }

  onEdit() {
    this.editMode = true;
  }

  onSave() {
    let timezone = new Zone();
    timezone.parse(this.model);
    let token = this.userService.currentUser.token;
    console.log(this.zone);
    timezone._id = this.zone._id;
    this.zone._id ? this.updateZone(timezone, token) : this.addZone(timezone, token);
    // TODO call userActivated after zone is added, updated or deleted
  }

  updateZone(zone:Zone, token:string) {
    console.log('update zone');
    this.zoneService.updateZone(zone, token).subscribe(
      data => {
        this.editMode = false;
        this.userService.refreshZones();
      },
      error => {
        console.log('error after operation:', error)
      }
    )
  }

  addZone(zone:Zone, token:string) {
    this.zoneService.addZone(zone, token).subscribe(
      data => {
        console.log('data after operation:', data);
        this.editMode = false;
        this.userService.currentUser.zones.push()
      },
      error => {
        console.log('error after operation:', error)
      }
    )
  }

  onDelete() {

  }

}
