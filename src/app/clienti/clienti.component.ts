import { Component, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { map, Observable, Subscription, switchMap, tap } from 'rxjs';
import { IProdottoResp } from '../models/IProdottoResp';
import { IUserResp } from '../models/IUserResp';
import { AppState } from '../reducers';
import { ClientiService } from '../services/clienti.service';
import { ProdottiClientiService } from '../services/prodotti-clienti.service';
import { ProdottiService } from '../services/prodotti.service';
import { cliente, clienti, lista, prodotti } from './actions/clienti.actions';
import { prodottiDef, prodottiSel, user, users } from './selector/clienti.selectors';

@Component({
  selector: 'app-clienti',
  templateUrl: './clienti.component.html',
  styleUrls: ['./clienti.component.css']
})
export class ClientiComponent implements OnInit, OnDestroy {

  constructor(private clienti: ClientiService, private servizioProdotti: ProdottiService, private prodottiClienti: ProdottiClientiService, private store: Store<AppState>) { }

  users: IUserResp[] = [];

  clienti$: Observable<IUserResp[] | undefined> | undefined;
  cliente$!: Observable<IUserResp | undefined>;
  idProdotti$: Observable<number[] | undefined> | undefined;
  prodotti$: Observable<IProdottoResp[] | undefined> | undefined;

  private subscriptions = new Subscription()
  clientiSub: Subscription | undefined;

  prodotti: any[] = [];


  ngOnInit(): void {

    this.clienti$ = this.store
      .pipe(
        select(users)
      )
    this.cliente$ = this.store
      .pipe(
        select(user)
      ),
      this.idProdotti$ = this.store
        .pipe(
          select(prodottiSel)
        ),

      this.prodotti$ = this.store
        .pipe(
          select(prodottiDef)
        )

    this.subscriptions?.add(
      this.clienti$!.subscribe({
        next: (val) => {
          if (val !== undefined) {
            this.users = val
          }
        }
      }));
    this.subscriptions?.add(
      this.clienti.users().subscribe({
        next: (resp) => {
          this.store.dispatch(clienti({ users: resp }));
        },
      }))
    

    this.subscriptions?.add(
      this.idProdotti$!.pipe(
        switchMap((e: any) => { return this.servizioProdotti.prodttiFiltrati(e) })
      ).subscribe(
        {
          next: (val) => {
            this.store.dispatch(lista({ prodotti: val }))
          }
        }
      ))

    this.subscriptions?.add(
      this.prodotti$!.subscribe({
        next: (value) => {
          this.prodotti = []
          value!.map(element => {
            this.prodotti.push(element)
            this.clientiSub?.unsubscribe()
          })
        }
      }));
      
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  callBody(user: IUserResp) {
    this.store.dispatch(cliente(user))

    if(this.clienti$ !=  undefined){
      this.cliente$!.pipe(
        switchMap((e: any) => { return this.prodottiClienti.prodottiUser(e.id) })
      ).subscribe({
        next: (value) => {
          let idProdotti: number[] = []
          idProdotti = value.relazione.map((el: any) => el.prodottiId);
          this.store.dispatch(prodotti({ idProd: idProdotti }));

        }
      })
    }

      
    this.clientiSub?.unsubscribe()
  }
}
