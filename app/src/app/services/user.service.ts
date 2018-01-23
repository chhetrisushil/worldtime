import {Injectable} from "@angular/core";

import {User} from '../models/user.model';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AppConfig} from "../app.config";
import {Subject} from "rxjs/Subject";
import {ZoneService} from "./zone.service";

@Injectable()
export class UserService {

  currentUser:User = null;
  userActivated = new Subject();

  constructor(private httpClient: HttpClient,
              private config: AppConfig,
              private zoneService:ZoneService) {
    this.currentUser.zones = [];
  }

  createNewUser(user: User, pass:string) {
    return this.httpClient.post(this.config.apiUrl+'/users/register',
      {username: user.username, role: user.role, password: pass});
  }

  login(username:string, pass:string) {
    return this.httpClient.post(this.config.apiUrl+'/users/login',
      {username: username, password: pass});
  }

  setCurrentUser(user:any) {
    if (!this.currentUser) {
      this.currentUser = new User();
    }
    this.currentUser.parse(user.user);
    this.currentUser.token = user.token;
    console.log('current user set to ', this.currentUser);
    this.userActivated.next(this.currentUser);
  }

  refreshCurrentUser() {
    this.userActivated.next(this.currentUser);
  }

  refreshZones() {

    this.zoneService.getZonesForCurrentUser(
      this.currentUser._id,
      this.currentUser.token)
      .subscribe(
        (zones:Object) => {
          this.currentUser.zones = zones;
          this.refreshCurrentUser();
        },
        error => {
          console.log('error in refreshZones');
        }
      )
  }

  getAllUsers() {
    return this.httpClient.get(
      this.config.apiUrl+'/users/',
      {
        headers: new HttpHeaders().set('x-access-token', this.currentUser.token)
      })
  }

  getUserById(id:string) {
    return this.httpClient.get(
      this.config.apiUrl+'/users/'+id,
      {
        headers: new HttpHeaders().set('x-access-token', this.currentUser.token)
      })
  }

  logout() {
    this.currentUser = null;
    this.userActivated.next(this.currentUser);
  }
}
