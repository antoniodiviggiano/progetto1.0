import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUser } from '../models/IUser';

@Injectable({
  providedIn: 'root'
})
export class LogInService {

  constructor(private http : HttpClient) { }

  logIn(): Observable<IUser[]> {
    let API_URL = `http://localhost:3000/utente`;
    return this.http.get(API_URL) as Observable<IUser[]>;
  }
}
