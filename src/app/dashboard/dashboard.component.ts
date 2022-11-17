import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { IProdotto } from '../models/IProdotto';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  cambiamento : boolean = false

  inserimento(){
    this.cambiamento = !this.cambiamento
  }

  isLogged : boolean = false;

  constructor(private auth : AuthService) { }

  ngOnInit(): void {
    this.isLogged = this.auth.isAuth();
  }

}
