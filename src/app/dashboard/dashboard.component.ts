import { OnChanges, Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  cambiamento: boolean = false;
  logged: boolean = false;

  inserimento() {
    this.cambiamento = !this.cambiamento
  }

  constructor(private auth: AuthService) { }
  
  ngOnInit(): void {
    this.logged = this.auth.isLoggedIn
  }






}
