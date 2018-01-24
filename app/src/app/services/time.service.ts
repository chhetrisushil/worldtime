import {Injectable} from "@angular/core";
import {Subject} from "rxjs/Subject";

@Injectable()
export class TimeService {
  timeUpdate = new Subject();
  timeInterval = null;
  constructor() {
    this.startTimeInterval();
  }

  startTimeInterval() {
    if (this.timeInterval) {
      window.clearTimeout(this.timeInterval);
    }
    this.timeInterval = window.setInterval(() => {
      this.timeUpdate.next(new Date());
    }, 1000);
  }

  convertCurrentTime(date:Date, offset:number = 0) {
    //let date:Date = new Date();
    date.setHours(date.getHours()+offset);
    let hrs = date.getHours(),
        mins = date.getMinutes(),
        secs = date.getSeconds()

    return ''+(hrs < 10 ? 0 : '')+hrs+':'+
      (mins < 10 ? 0 : '')+mins+':'+
      (secs < 10 ? 0 : '')+secs;
  }
}
