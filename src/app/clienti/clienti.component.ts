import { Component, OnDestroy, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { interval, map, Subscription, mergeMap, concatMap, take, tap, switchMap, of, SubscriptionLike, Observable } from 'rxjs';
import { IProdotto } from '../models/IProdotto';
import { IProdottoResp } from '../models/IProdottoResp';
import { IUserResp } from '../models/IUserResp';
import { AppState } from '../reducers';
import { ClientiService } from '../services/clienti.service';
import { ProdottiClientiService } from '../services/prodotti-clienti.service';
import { ProdottiService } from '../services/prodotti.service';
import { clienti, cliente, prodotti, lista } from './actions/clienti.actions';
import { prodottiDef, prodottiSel, user, users } from './selector/clienti.selectors';

@Component({
  selector: 'app-clienti',
  templateUrl: './clienti.component.html',
  styleUrls: ['./clienti.component.css']
})
export class ClientiComponent implements OnInit, OnDestroy {

  constructor(private clienti: ClientiService, private servizioProdotti: ProdottiService, private prodottiClienti: ProdottiClientiService, private store: Store<AppState>) { }

  clientiSUB: Subscription | undefined;
  ProdottiSUB: Subscription | undefined;

  users: IUserResp[] = [];

  clienti$: Observable<IUserResp[] | undefined> | undefined;
  cliente$: Observable<IUserResp | undefined> | undefined;
  idProdotti$: Observable<number[] | undefined> | undefined;
  prodotti$: Observable<IProdottoResp[] | undefined> | undefined;

  prodotti: any[] = [];

  prodottiFiltrati$: Subscription | undefined;

  ngOnInit(): void {

    this.clientiSUB = this.clienti.users().subscribe({
      next: (resp) => {
        this.store.dispatch(clienti({ users: resp }));
      },
    })

    this.clienti$ = this.store
      .pipe(
        select(users)
      )
    this.cliente$ = this.store
      .pipe(
        select(user)
      )
    this.idProdotti$ = this.store
      .pipe(
        select(prodottiSel)
      )

    this.prodotti$ = this.store
      .pipe(
        select(prodottiDef)
      )

    this.idProdotti$.pipe(
      switchMap((e: any) => { return this.servizioProdotti.prodttiFiltrati(e) })
    ).subscribe(
      {
        next: (val) => {
          this.store.dispatch(lista({ prodotti: val }))
        }
      }
    )
      this.prodotti$.subscribe({
        next: (value) => {
          if (value) {
            this.prodotti = []
            value!.map(element => {
              this.prodotti.push(element)
            });
          }
        }
      })
    

    this.clienti$.subscribe({
      next: (val) => {
        if (val !== undefined) {
          this.users = val
        }
      }
    })
    this.cliente$.subscribe({
      next: (val) => {
        if (val !== undefined) {
          this.prodottiClienti.prodottiUser(val.id).subscribe({
            next: (value) => {
              let idProdotti: number[] = []
              idProdotti = value.relazione.map((el: any) => el.prodottiId);
              this.store.dispatch(prodotti({ idProd: idProdotti }))
            }
          })
        }
      }
    })
  }

  ngOnDestroy(): void {
    this.clientiSUB?.unsubscribe;
    this.ProdottiSUB?.unsubscribe;
    this.prodottiFiltrati$?.unsubscribe;
  }

  callBody(user: IUserResp) {
    this.store.dispatch(cliente(user))
  }
}
