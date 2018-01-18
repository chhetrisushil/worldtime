import {Injectable} from "@angular/core";

@Injectable()
export class TimeService {
  constructor() {}

  getCurrentTime() {
    let date:Date = new Date(),
      hrs = date.getHours(),
      mins = date.getMinutes(),
      secs = date.getSeconds()

    return ''+(hrs < 10 ? 0 : '')+hrs+':'+
      (mins < 10 ? 0 : '')+mins+':'+
      (secs < 10 ? 0 : '')+secs;
  }
}
