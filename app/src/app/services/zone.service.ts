import {Injectable} from "@angular/core";
import {Zone} from "../models/zone.model";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AppConfig} from "../app.config";
import {UserService} from "./user.service";
import {Subject} from "rxjs/Subject";

@Injectable()
export class ZoneService {

  zonesUpdated = new Subject();
  constructor(private httpClient:HttpClient,
              private config:AppConfig) {

  }

  getZonesForUser(id:string, token:string) {
    return this.httpClient.get(
      this.config.apiUrl+'/zones/byuser?id='+id,
      {
        headers: new HttpHeaders().set('x-access-token', token)
      })
  }
  getZonesForCurrentUser(id:string, token:string) {
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
        headers: new HttpHeaders().set('x-access-token', token)
      })

  }

  updateZone(zone:Zone, token:string) {
    console.log('update zone:', zone)
    return this.httpClient.put(
      this.config.apiUrl+'/zones/'+zone._id,
      zone,
      {
        headers: new HttpHeaders().set('x-access-token', token)
      })
  }

  deleteZone(zone:Zone, token:string) {
    console.log('delete zone:', zone)
    return this.httpClient.delete(
      this.config.apiUrl+'/zones/'+zone._id,
      {
        headers: new HttpHeaders().set('x-access-token', token)
      })
  }

}
