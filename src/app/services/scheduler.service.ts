import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DayPilot } from 'daypilot-pro-angular';
import { Observable } from 'rxjs';
import { IUserResp } from '../models/IUserResp';

@Injectable({
  providedIn: 'root'
})
export class SchedulerService {

  constructor(private http: HttpClient) { }
  
  users(): Observable<IUserResp[]> {
    
    let API_URL = `http://localhost:8080/users`;

    return (this.http.get(API_URL) as Observable<IUserResp[]>);
    
  }

  getEvents(): Observable<any[]> {
     return this.http.get("http://localhost:8080/items") as Observable<any[]>;
  }


  addEvents(event : any): Observable<any[]> {
     return this.http.post("http://localhost:8080/items" , event) as Observable<any[]>;
  }

  removeEvents(id : string) : Observable<any[]> {
    return this.http.delete(`http://localhost:8080/items/${id}`) as Observable<any[]>
  }

  updateEvents(id :  string, start : any, end : any) : Observable<any[]> {
    return this.http.patch(`http://localhost:8080/items/${id}`, {start: start, end: end}) as Observable<any[]>
  }

  
  movedEvents(id :  string, start : any, end : any, resource: number) : Observable<any[]> {
    return this.http.patch(`http://localhost:8080/items/${id}`, {start: start, end: end, resource: resource}) as Observable<any[]>
  }


}
