import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IRelazione } from '../models/IRelazione';

@Injectable({
  providedIn: 'root'
})
export class RelazioniService {

  constructor(private http : HttpClient) { }

  relazione(data : IRelazione) {
    let API_URL = `http://localhost:8080/relazione`;
    return (this.http.post(API_URL, data))
  }
}
