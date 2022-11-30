import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IProdottoResp } from '../models/IProdottoResp';
import { IUser } from '../models/IUser';

@Injectable({
  providedIn: 'root'
})
export class ClientiService {
  push(el: IProdottoResp) {
    throw new Error('Method not implemented.');
  }

  constructor(private http: HttpClient) { }

  clienti(): Observable<IUser[]> {
    
    let API_URL = `http://localhost:8080/users`;

    return this.http.get(API_URL) as Observable<IUser[]>;
    
    
  }
}
