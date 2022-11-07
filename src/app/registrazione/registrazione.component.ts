import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Data, Router } from '@angular/router';
import { IUser } from '../models/IUser';
import { PostRegistrzioneService } from '../services/registrzione.service';
import * as moment from 'moment';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';

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
    dataNascita: new FormControl('', [Validators.required]),  //moment
  })

  lastId!: number;

  constructor(private postRegistrzioneService: PostRegistrzioneService, private router: Router,public translate: TranslateService){}


  ngOnInit(): void {
  }

  checkYear() {
    let data: Data = new Date(this.form.value.dataNascita as string);
    let year = parseInt(moment(data).format('YYYY'));

    if (year < 999) {
      this.form.controls.dataNascita.setErrors({ incorect: true });
    } else {
      this.form.controls.dataNascita.setErrors(null);
    }

  }

  registrer() {

    const body: IUser = {
      nomeUtente: this.form.value.nomeUtente as string,
      password: this.form.value.password as string,
      email: this.form.value.email as string,
      dataNascita: this.form.value.dataNascita as string,
    };

    this.postRegistrzioneService.create(body).subscribe({
      next: () => {
        alert(this.translate.instant("GENERALE.RegistrazioneCompiuta"));
        this.router.navigate(['/login']);
      },
      error: (err) => console.log(err),
    });
  }

  validForm: boolean = this.form.valid;

}

