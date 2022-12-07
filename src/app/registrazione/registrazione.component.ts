import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IUser } from '../models/IUser';
import { PostRegistrzioneService } from '../services/registrzione.service';
import { dataValidator } from '../validator/dataValidator';
import { select, Store } from '@ngrx/store';
import { registazione } from './actions/registrazione.actions';
import { AppState } from '../reducers';
import { noop, tap } from 'rxjs';
import { Resp } from '../models/IResp';

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

  constructor(private store : Store<AppState>,private registrazione : PostRegistrzioneService) { }

  ngOnInit(): void {
    
  }

  registrer() {
    const body: IUser = {
      nomeUtente: this.form.value.nomeUtente as string,
      password: this.form.value.password as string,
      email: this.form.value.email as string,
      dataNascita: this.form.value.dataNascita as string,
    };

    this.registrazione.create(body)
      .pipe(
        tap((resp : Resp) => {
          this.store.dispatch(registazione(resp));
        })  
      )
      .subscribe(
        noop,
        () => alert('Registrazione Fallita')
      )

  }
  validForm: boolean = this.form.valid;
}

