import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { data } from 'cypress/types/jquery';
import { Observable } from 'rxjs';
import { IProdottoResp } from '../models/IProdottoResp';

@Injectable({
  providedIn: 'root'
})
export class UpdateProdottiService {

  constructor(private http : HttpClient) { }

  update( data: IProdottoResp): Observable<IProdottoResp[]> {
    let API_URL = `http://localhost:8080/prodotti/${data.id}`;
    return (this.http.patch(API_URL, data) as Observable<IProdottoResp[]>)
  }
}
