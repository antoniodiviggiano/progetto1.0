import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  isLogged : boolean = false;

  constructor(private auth : AuthService) { }

  ngOnInit(): void {
    this.isLogged = this.auth.isAuth();
  }

}
