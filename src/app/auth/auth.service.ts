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
    this.login$.next(true);
    return this.isLoggedIn
  }

  login(){
    this.login$.next(true);
    this.isLoggedIn = true;
  }

  logout() {
    this.login$.next(false);
    this.isLoggedIn = true;
    localStorage.removeItem('accessToken');

    this.router.navigate(["/login"]).then(() => {
      window.location.reload();
    });
  }
}
