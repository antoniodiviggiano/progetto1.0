import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IUser } from '../models/IUser';
import { PostRegistrzioneService } from '../services/registrzione.service';
import { TranslateService } from '@ngx-translate/core';
import { dataValidator } from '../validator/dataValidator';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-registrazione',
  templateUrl: './registrazione.component.html',
  styleUrls: ['./registrazione.component.css']
})
export class RegistrazioneComponent implements OnInit {

  form = new FormGroup({
    nomeUtente: new FormControl('', [Validators.required, Validators.minLength(3)]),
    password: new FormControl('', [Validators.required, Validators.minLength(5)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    dataNascita: new FormControl('', [Validators.required, dataValidator]),
  })

  respComponent: any;
  lastId!: number;

  constructor(private postRegistrzioneService: PostRegistrzioneService, private router: Router, public translate: TranslateService) { }

  ngOnInit(): void {
    
  }


  registrer() {
    const body: IUser = {
      nomeUtente: this.form.value.nomeUtente as string,
      password: this.form.value.password as string,
      email: this.form.value.email as string,
      dataNascita: this.form.value.dataNascita as string,
    };
    
  }
  
  validForm: boolean = this.form.valid;

}

