import { Component, OnInit } from '@angular/core';
import {TimeService} from "../../services/time.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  currentTime:string;
  constructor(private time:TimeService) { }

  ngOnInit() {
    this.startTimeInterval();
  }

  startTimeInterval() {
    this.currentTime = this.time.getCurrentTime();
    setInterval(() => {
      this.getCurrentTime();
    }, 1000);
  }

  getCurrentTime() {
    this.currentTime = this.time.getCurrentTime();
  }

}
