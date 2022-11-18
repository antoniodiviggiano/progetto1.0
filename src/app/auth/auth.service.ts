import { ResourceLoader } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLoggedIn = false;

  login$ : Subject<boolean> = new Subject();

  constructor( private router : Router ) {  }

  isAuth() : boolean {
    return this.isLoggedIn
  }

  login(){
    this.login$.next(true);
  }

  logout() {
    this.login$.next(false);
    localStorage.removeItem('accessToken');

    this.router.navigate(["/login"]).then(() => {
      window.location.reload();
    });
  }
}
