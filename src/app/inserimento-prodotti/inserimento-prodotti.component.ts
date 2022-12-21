import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { map, Observable, of, Subscription, switchMap } from 'rxjs';
import { IProdotto } from '../models/IProdotto';
import { IProdottoResp } from '../models/IProdottoResp';
import { IUser } from '../models/IUser';
import { AppState } from '../reducers';
import { ClientiService } from '../services/clienti.service';
import { InsermentoProdottoService } from '../services/insermento-prodotto.service';
import { ProdottiService } from '../services/prodotti.service';
import { RelazioniService } from '../services/relazioni.service';
import { prodottiSelector } from '../tabellaprodotti/selectors/tabellaprodotti.selectors';
import { inserimentoAction, inserimentoRelazioneAction } from './actions/inserimento.actions';
@Component({
  selector: 'app-inserimento-prodotti',
  templateUrl: './inserimento-prodotti.component.html',
  styleUrls: ['./inserimento-prodotti.component.css'],

})

export class InserimentoProdottiComponent implements OnDestroy, OnInit {


  alertConfermaProdotto : boolean = false;
  inserimentoProdotti: FormGroup;
  utenti: IUser[] = [];
  clientiData: any = [];
  prodottiState: IProdottoResp[] = []

  prodotti$: Subscription | undefined;
  clienti$: Subscription | undefined;

  prodottiState$: Observable<any> | undefined
  


  @Output() inserimento = new EventEmitter<boolean>;

  get clientiFormArray() {
    return this.inserimentoProdotti.controls['clienti'] as FormArray;
  }

  constructor(private service: InsermentoProdottoService,
    private clienti: ClientiService,
    private formBuilder: FormBuilder,
    private relazioneService: RelazioniService,
    private prodotti: ProdottiService,
    private store: Store<AppState>) {


    this.inserimentoProdotti = this.formBuilder.group({
      nome: new FormControl("", [Validators.required, Validators.minLength(3)]),
      descrizone: new FormControl("", [Validators.required, Validators.minLength(3), Validators.maxLength(75)]),
      prezzo: new FormControl("", [Validators.required, Validators.min(0.01)]),
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
  ngOnInit(): void {
    this.prodottiState$ = this.store.pipe(
      select(prodottiSelector)
    )

    this.prodottiState$.subscribe({
      next: (value) => {
        this.prodottiState = value
      },
    })
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


    this.alertConfermaProdotto = true
    setTimeout(() => { this.alertConfermaProdotto = false; }, 2000);




    const prodotto: IProdotto = {
      nome: this.inserimentoProdotti.value.nome as string,
      descrizione: this.inserimentoProdotti.value.descrizone as string,
      prezzo: this.inserimentoProdotti.value.prezzo as string,
    };

    this.service.insermento(prodotto).subscribe({
      next: (prodottoInserito) => {
        this.store.dispatch(inserimentoAction({ prodotti: [...this.prodottiState, prodottoInserito] }))
      },

    })

    let arrayClienti: boolean[] = this.inserimentoProdotti.value.clienti

    arrayClienti.map((e, index) => {
      if (e === true) {
        this.prodotti$ = this.prodotti.prodotti().pipe(
          map((el) => el.length),
          switchMap((val) => {
            return this.relazioneService.relazione({ userId: index + 1, prodottiId: val })
          }),
        ).subscribe({
          next: (value) => {
            this.store.dispatch(inserimentoRelazioneAction(value))
          },
        })
      }
    });

    this.inserimentoProdotti.value.clienti
      .map((checked: any, i: number) => (checked ? this.clientiData[i] : null))
      .filter((v: null) => v !== null);
  }

  ngOnDestroy(): void {
    this.prodotti$?.unsubscribe();
    this.clienti$?.unsubscribe();
  }
}

