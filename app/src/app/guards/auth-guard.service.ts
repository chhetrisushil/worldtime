import {ActivatedRouteSnapshot,
        CanActivate,
        Router,
        RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs/Observable";
import {UserService} from "../services/user.service";
import {Injectable} from "@angular/core";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private userService:UserService,
              private router:Router) {}

  canActivate(route:ActivatedRouteSnapshot,
              state:RouterStateSnapshot):Observable<boolean> | Promise<boolean> | boolean {
    let loggedIn = false;
    if (this.userService.currentUser) {
      loggedIn = true;
    }

    if (!loggedIn) {
      this.router.navigate(['/login']);
    }

    return loggedIn;
  }
}
