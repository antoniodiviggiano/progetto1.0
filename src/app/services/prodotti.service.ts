import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IProdottoResp } from '../models/IProdottoResp';
import { Resp } from '../models/IResp';

@Injectable({
  providedIn: 'root'
})
export class ProdottiService {

  constructor(private http: HttpClient) { }
  
  prodotti(): Observable<IProdottoResp[]> {
    
    let API_URL = `http://localhost:8080/prodotti `;

    return this.http.get(API_URL) as Observable<IProdottoResp[]>;
    
  }
}
