import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { debounce, delay, filter, map, mapTo, of, Subscription, switchMap, takeLast, timer } from 'rxjs';
import { IProdotto } from '../models/IProdotto';
import { IRelazione } from '../models/IRelazione';
import { IUser } from '../models/IUser';
import { ClientiService } from '../services/clienti.service';
import { InsermentoProdottoService } from '../services/insermento-prodotto.service';
import { ProdottiService } from '../services/prodotti.service';
import { RelazioniService } from '../services/relazioni.service';
@Component({
  selector: 'app-inserimento-prodotti',
  templateUrl: './inserimento-prodotti.component.html',
  styleUrls: ['./inserimento-prodotti.component.css']
})

export class InserimentoProdottiComponent implements OnDestroy{
  inserimentoProdotti: FormGroup;
  utenti: IUser[] = [];
  clientiData: any = [];
  utentifun: string[] = [];

  prodotti$: Subscription | undefined;
  clienti$: Subscription | undefined;


  @Output() inserimento = new EventEmitter<boolean>;

  get clientiFormArray() {
    return this.inserimentoProdotti.controls['clienti'] as FormArray;
  }

  constructor(private service: InsermentoProdottoService,
    private clienti: ClientiService,
    private formBuilder: FormBuilder,
    private relazioneService: RelazioniService,
    private prodotti: ProdottiService) {


    this.inserimentoProdotti = this.formBuilder.group({
      nome: new FormControl("bana", [Validators.required, Validators.minLength(3)]),
      descrizone: new FormControl("nenene", [Validators.required, Validators.minLength(3), Validators.maxLength(75)]),
      prezzo: new FormControl("112", [Validators.required, Validators.min(0.01)]),
      clienti: new FormArray([], this.minSelectedCheckboxes(1)),
    });

    of(this.clienti$ = this.clienti.users().subscribe({
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
      },
      error: (err) => console.log(err),
    })

    this.inserimentoProdotti.value.clienti
      .map((checked: any, i: number) => (checked ? this.clientiData[i] : null))
      .filter((v: null) => v !== null);

    let arrayClienti: boolean[] = this.inserimentoProdotti.value.clienti

    arrayClienti.map((e, index) => {
      this.inserimentoProdotti.reset();
      if (e === true) {
        this.prodotti$ = this.prodotti.prodotti().pipe(
          map((el) => el.length + 1),
          switchMap((val) => { return this.relazioneService.relazione({ userId: index + 1, prodottiId: val }) })
        ).subscribe()
      }
    })
  }
  
  ngOnDestroy(): void {
    this.prodotti$?.unsubscribe();
    this.clienti$?.unsubscribe();
  }
}