import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { login, registrazione, clienti, dashboard, logout } from '../actions/app.actions';
import { isLoggedOut, isLoggedIn } from '../auth/selectors/auth.selectors';
import { AppState } from '../reducers';

@Component({
  selector: 'app-menubar',
  templateUrl: './menubar.component.html',
  styleUrls: ['./menubar.component.css']
})
export class MenubarComponent implements OnInit {

  logIN$! : Observable<boolean>;
  logOUT$! : Observable<boolean>;

  constructor(private store : Store<AppState>) { }

  ngOnInit(): void {

    this.logIN$ = this.store.pipe(
      select(isLoggedOut)
    )
    this.logOUT$ = this.store.pipe(
      select(isLoggedIn)
    )
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
      case "logout":
        this.store.dispatch(logout())
        break;
    }
  }

}
