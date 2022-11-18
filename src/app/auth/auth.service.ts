import { ResourceLoader } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLoggedIn = false;

  constructor( private router : Router ) {  }

  isAuth() : boolean {   
    return this.isLoggedIn
  }

  logout() {
    this.isLoggedIn = true;
    localStorage.removeItem('accessToken');

    this.router.navigate(["/login"]).then(() => {
      window.location.reload();
    });
  }
}
