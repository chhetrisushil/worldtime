import { Component, OnInit, Input } from '@angular/core';
import {UserService} from "../../services/user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-single-user',
  templateUrl: './single-user.component.html',
  styleUrls: ['./single-user.component.css']
})
export class SingleUserComponent implements OnInit {

  @Input() user:any;
  roles = ['User', 'User manager', 'Admin'];
  isCurrentUser = false;
  constructor(private userService:UserService,
              private router:Router) { }

  ngOnInit() {
    if (this.user._id === this.userService.currentUser._id) {
      this.isCurrentUser = true;
    }
  }

  onDetails() {
    this.router.navigate(['/details/'+this.user._id]);
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
