import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IProdotto } from '../models/IProdotto';
import { IProdottoResp } from '../models/IProdottoResp';
import { IUserResp } from '../models/IUserResp';

@Injectable({
  providedIn: 'root'
})
export class ProdottiClientiService {

  constructor(private http: HttpClient) { }

  //let API_URL = `http://localhost:8080/users?_embed=prodotti`;

  // http://localhost:8080/users/?_embed=relazione (m to n)

  prodottiUser(id: number): Observable<any> {
    let API_URL = `http://localhost:8080/users/${id}/?_embed=relazione`;

    return this.http.get(API_URL) as Observable<any>;
  }
}
