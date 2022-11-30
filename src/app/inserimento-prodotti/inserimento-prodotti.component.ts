import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { of } from 'rxjs';
import { IProdotto } from '../models/IProdotto';
import { IUser } from '../models/IUser';
import { ClientiService } from '../services/clienti.service';
import { InsermentoProdottoService } from '../services/insermento-prodotto.service';


@Component({
  selector: 'app-inserimento-prodotti',
  templateUrl: './inserimento-prodotti.component.html',
  styleUrls: ['./inserimento-prodotti.component.css']
})


export class InserimentoProdottiComponent {
  inserimentoProdotti: FormGroup;
  utenti: IUser[] = [];
  clientiData: any = [];
  utentifun: string[] = [];


  @Output() inserimento = new EventEmitter<boolean>;

  get clientiFormArray() {
    return this.inserimentoProdotti.controls['clienti'] as FormArray;
  }

  constructor(private service: InsermentoProdottoService, private clienti: ClientiService, private formBuilder: FormBuilder) {
    this.inserimentoProdotti = this.formBuilder.group({
      nome: new FormControl("", [Validators.required, Validators.minLength(3)]),
      descrizone: new FormControl("", [Validators.required, Validators.minLength(3), Validators.maxLength(75)]),
      prezzo: new FormControl("", [Validators.required, Validators.min(0.01)]),
      clienti: new FormArray([], this.minSelectedCheckboxes(1)),
    });

    of(this.clienti.clienti().subscribe({
      next: (resp) => {
        resp.map(() => {
          this.clientiData = resp.map((el) => el.nomeUtente);
        });
        this.addCheckboxes();
      },
      error: (err) => console.log(err),
    }));
  }


  private addCheckboxes() {
    this.clientiData.forEach(() =>
      this.clientiFormArray.push(new FormControl(false))
    );
  }

  minSelectedCheckboxes(min = 1) {
    const validator: ValidatorFn = (formArray: AbstractControl) => {
      if (formArray instanceof FormArray) {
        const totalSelected = formArray.controls
          .map((control) => control.value)
          .reduce((prev, next) => (next ? prev + next : prev), 0);       
        return totalSelected >= min ? null : { required: true };
      }
      throw new Error('formArray is not an instance of FormArray');
    };
    return validator;
  }

  inserisciProdotti() {
    const prodotto: IProdotto = {
      nome: this.inserimentoProdotti.value.nome as string,
      descrizione: this.inserimentoProdotti.value.descrizone as string,
      prezzo: this.inserimentoProdotti.value.prezzo as string,
    };
    this.service.insermento(prodotto).subscribe({
      next: (resp) => {
        this.inserimentoProdotti.reset();
        this.inserimento.emit()
        console.log(resp);
      },
      error: (err) => console.log(err),
    })
    this.valComponent = [];
    const selectedClientiIds = this.inserimentoProdotti.value.clienti
      .map((checked: any, i: number) => (checked ? this.clientiData[i] : null))
      .filter((v: null) => v !== null);
    console.log(selectedClientiIds);
  }
  valComponent: number[] = []
}
