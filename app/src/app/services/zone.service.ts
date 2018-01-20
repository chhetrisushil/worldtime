import {Injectable} from "@angular/core";
import {Zone} from "../models/zone.model";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AppConfig} from "../app.config";
import {UserService} from "./user.service";

@Injectable()
export class ZoneService {

  constructor(private httpClient:HttpClient,
              private config:AppConfig) {

  }

  getZonesForUser(id:string, token:string) {
    return this.httpClient.get(
      this.config.apiUrl+'/zones/',
      {
        headers: new HttpHeaders().set('x-access-token', token)
      })
  }

  addZone(zone:Zone, token:string) {
    console.log('add zone:', zone);
    return this.httpClient.post(
      this.config.apiUrl+'/zones/',
      zone,
      {
        headers: new HttpHeaders().set('x-access-token', token),
      })

  }

  updateZone(zone:Zone, token:string) {
    console.log('update zone:', zone)
    return this.httpClient.put(
      this.config.apiUrl+'/zones/'+zone._id,
      zone,
      {
        headers: new HttpHeaders().set('x-access-token', token),
      })
  }

  deleteZone(zone:Zone) {

  }
}
