import { Component, OnInit } from '@angular/core';
import {TimeService} from "../../services/time.service";
import {Subscription} from "rxjs/Subscription";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  currentTime:string;
  sub:Subscription;
  constructor(private ts:TimeService) { }

  ngOnInit() {
    this.currentTime = this.ts.convertCurrentTime(new Date());
    this.sub = this.ts.timeUpdate.subscribe(
      (date:Date) => {
        this.currentTime = this.ts.convertCurrentTime(date)
      }
    )
  }

}
