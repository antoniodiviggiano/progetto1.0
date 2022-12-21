import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { htmlPrefilter } from 'cypress/types/jquery';
import { map, Observable, Subscription, switchMap } from 'rxjs';
import { utenti } from '../clienti-porodotti/actions/clientiProdotti-actions';
import { nomi } from '../clienti-porodotti/selectors/clienti-prodotti.selectors';
import { IProdotto } from '../models/IProdotto';
import { IProdottoResp } from '../models/IProdottoResp';
import { IUser } from '../models/IUser';
import { IUserResp } from '../models/IUserResp';
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
  styleUrls: ['.//inserimento-prodotti.component.css']
})

export class InserimentoProdottiComponent implements OnDestroy, OnInit {

  alertConfermaProdotto: boolean = false;
  inserimentoProdotti: FormGroup;
  utenti: IUserResp[] = [];
  prodottiState: IProdottoResp[] = []


  prodottiState$: Observable<any> | undefined

  nomiUtenti: string[] = [];
  possessori: string[] = [];


  nomi$!: Subscription


  constructor(private service: InsermentoProdottoService,
    private formBuilder: FormBuilder,
    private relazioneService: RelazioniService,
    private prodotti: ProdottiService,
    private store: Store<AppState>,
    private user: ClientiService) {

    this.inserimentoProdotti = this.formBuilder.group({
      nome: new FormControl("", [Validators.required, Validators.minLength(3)]),
      descrizone: new FormControl("", [Validators.required, Validators.minLength(3), Validators.maxLength(75)]),
      prezzo: new FormControl("", [Validators.required, Validators.min(0.01)]),
    });

  }
  ngOnInit(): void {

    this.nomiUtenti = [];
    this.possessori = [];

    this.user.users().subscribe({
      next: (ut) => {
        this.store.dispatch(utenti({ users: ut }))
      },
    })

    this.nomi$ = this.store.pipe(
      select(nomi)
    ).subscribe({
      next: (value) => {
        this.nomiUtenti = []
        if (value) {
          this.utenti = value
          this.utenti.map(utente => this.nomiUtenti.push(utente.id + ')' + utente.nomeUtente))
        }
      },
    })

    this.prodottiState$ = this.store.pipe(
      select(prodottiSelector)
    )

    this.prodottiState$.subscribe({
      next: (value) => {
        this.prodottiState = value
      },
    })
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

    this.possessori.map(nome => {
      this.prodotti.prodotti().pipe(
        map((el) => el.length),
        switchMap((val) => {
          return this.relazioneService.relazione({ userId: parseInt(nome[0]), prodottiId: val })
        }),
      ).subscribe({
        next: (value) => {
          this.store.dispatch(inserimentoRelazioneAction(value))
        },
      })
    })

    this.nomiUtenti.push(...this.possessori);
    this.possessori = []
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
    console.log(this.possessori);

  }




  ngOnDestroy(): void {
  }

}