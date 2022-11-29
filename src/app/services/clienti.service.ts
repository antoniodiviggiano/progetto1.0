import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUserResp } from '../models/IUserResp';

@Injectable({
  providedIn: 'root'
})
export class ClientiService {

  constructor(private http: HttpClient) { }
  
  users(): Observable<IUserResp[]> {
    
    let API_URL = `http://localhost:8080/users`;

    return this.http.get(API_URL) as Observable<IUserResp[]>;
    
  }

}
