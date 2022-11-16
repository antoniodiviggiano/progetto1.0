import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IProdotto } from '../models/IProdotto';

@Injectable({
  providedIn: 'root'
})
export class InsermentoProdottoService {

  constructor(private http : HttpClient) { }

  insermento(data : IProdotto){
      let API_URL = `http://localhost:8080/prodotti`;
      return (this.http.post(API_URL,data))
  }

}
