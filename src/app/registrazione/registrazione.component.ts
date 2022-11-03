import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

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
    dataNascita: new FormControl('', Validators.required),
  })

  constructor() {
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    alert(`Benvenuto  ${this.form.value.nomeUtente}`);
  }

  validForm : boolean = this.form.valid;


}
