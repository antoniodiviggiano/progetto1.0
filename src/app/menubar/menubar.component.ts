import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { login, registrazione, clienti, dashboard, logout, profilo } from '../actions/app.actions';
import { isLoggedOut, isLoggedIn } from '../auth/selectors/auth.selectors';
import { Resp } from '../models/IResp';
import { AppState } from '../reducers';
import { checkLogin } from './action/menubar.action';

@Component({
  selector: 'app-menubar',
  templateUrl: './menubar.component.html',
  styleUrls: ['./menubar.component.css']
})
export class MenubarComponent implements OnInit {

  logIN$! : Observable<boolean>;
  logOUT$! : Observable<boolean>;

  logged : Resp | null | undefined

  constructor(private store : Store<AppState>) { }

  ngOnInit(): void {


    this.logged = JSON.parse(localStorage.getItem('logged') as string);

    if(this.logged){
      this.store.dispatch(checkLogin({logged : this.logged}));
    } else {
      this.store.dispatch(checkLogin({logged : undefined}));
      
    }
    

    this.logIN$ = this.store.pipe(
      select(isLoggedOut)
    )
    this.logOUT$ = this.store.pipe(
      select(isLoggedIn)
    )
   


    //this.store.dispatch(checkLogin())
  }

  menuBar(type: string) {
    switch (type) {
      case "login":
        this.store.dispatch(login())
        break;
      case "registrazione":
        this.store.dispatch(registrazione())
        break;
      case "clienti":
        this.store.dispatch(clienti())
        break;
      case "dashboard":
        this.store.dispatch(dashboard())
        break;
      case "profilo":
        this.store.dispatch(profilo())
        break;
    }
  }

}
