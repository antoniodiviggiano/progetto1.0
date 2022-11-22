import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IProdotto } from '../models/IProdotto';
import { IProdottoResp } from '../models/IProdottoResp';
import { TabellaprodottiComponent } from '../tabellaprodotti/tabellaprodotti.component';

@Injectable({
  providedIn: 'root'
})
export class InsermentoProdottoService {

  constructor(private http : HttpClient) { }

  insermento(data : IProdotto): Observable<IProdottoResp>{
      let API_URL = `http://localhost:8080/prodotti`;
      return (this.http.post(API_URL,data)as Observable<IProdottoResp>)
  }
}
