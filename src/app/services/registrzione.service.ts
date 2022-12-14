import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { IUser } from '../models/IUser';

@Injectable({
  providedIn: 'root'
})

export class PostRegistrzioneService {

  constructor(private http : HttpClient){}

  create(data: IUser) {
    let API_URL = `http://localhost:8080/users/register`;
    return (this.http.post(API_URL, data))
  }
  
  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    return throwError(()=>
      'Something bad happened; please try again later.');
  };

}
