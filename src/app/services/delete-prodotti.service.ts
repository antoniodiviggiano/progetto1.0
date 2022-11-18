import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DeleteProdottiService {

  constructor(private http: HttpClient) { }

  onDelete(id: number) {
    this.http.delete('http://localhost:8080/prodotti/'+ id)
    .subscribe()
  }
}
