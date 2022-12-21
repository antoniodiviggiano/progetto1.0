import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { logout } from '../actions/app.actions';
import { IUser } from '../models/IUser';
import { AppState } from '../reducers';
import { datiUtente } from './selectors/profilo.selectors';

@Component({
  selector: 'app-profilo',
  templateUrl: './profilo.component.html',
  styleUrls: ['./profilo.component.css']
})
export class ProfiloComponent implements OnInit {

  datiUtente$! : Subscription
  utente : IUser | undefined

  constructor(private store : Store<AppState>) {

    this.datiUtente$ = this.store.pipe(
      select(datiUtente) 
    ).subscribe({
      next:(value) => {
        this.utente = value
      },
    })
  }

  
  
  logout(){
    this.store.dispatch(logout())
  }


  ngOnInit(): void {
  }

}
