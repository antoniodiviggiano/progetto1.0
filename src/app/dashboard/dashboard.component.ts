import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  cambiamento: boolean = false;

  logIN : undefined | boolean;

  inserimento() {
    this.cambiamento = !this.cambiamento
  }

  constructor(private auth: AuthService) {

  }

  ngOnInit(): void {

    this.logIN = this.auth.isLoggedIn;
  }

}
