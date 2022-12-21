import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { isLoggedIn, isLoggedOut } from '../auth/selectors/auth.selectors';
import { AppState } from '../reducers';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  logged$!: Observable<boolean>;



  constructor(private auth: AuthService,private store : Store<AppState>) { }

  ngOnInit(): void {

    this.logged$ = this.store.pipe(
      select(isLoggedIn)
    )

  }
}
