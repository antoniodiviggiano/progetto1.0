import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { Resp } from '../models/IResp';

@Injectable({
  providedIn: 'root'
})
export class LogInService {

  constructor(private http : HttpClient) { }

  logIn(email : string, password : string ): Observable<Resp> {
    let API_URL = `http://localhost:8080/login`;
    //catchError(err => console.log(err))
    return this.http.post(API_URL, {email, password}) as Observable<Resp>;
    
    
  }
}
