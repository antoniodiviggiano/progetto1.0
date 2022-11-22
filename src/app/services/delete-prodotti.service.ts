import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IProdottoResp } from '../models/IProdottoResp';

@Injectable({
  providedIn: 'root'
})
export class DeleteProdottiService {

  constructor(private http: HttpClient) { }

  onDelete(id: number): Observable<IProdottoResp> {
    return this.http.delete<IProdottoResp>('http://localhost:8080/prodotti/' + id);
  }
}
