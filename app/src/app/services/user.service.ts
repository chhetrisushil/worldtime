import {Injectable} from "@angular/core";

import {User} from '../models/user.model';
import {HttpClient} from "@angular/common/http";
import {AppConfig} from "../app.config";
import {Subject} from "rxjs/Subject";

@Injectable()
export class UserService {

  currentUser:User;
  userActivated = new Subject();

  constructor(private httpClient: HttpClient,
              private config: AppConfig) {}

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
    this.userActivated.next(this.currentUser)
  }

  logout() {
    this.currentUser = null;
    this.userActivated.next(this.currentUser);
  }
}
