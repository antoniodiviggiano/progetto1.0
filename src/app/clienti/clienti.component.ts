import { Component, OnDestroy, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { interval, map, Subscription,mergeMap, concatMap, take, tap, switchMap, of, SubscriptionLike } from 'rxjs';
import { IProdotto } from '../models/IProdotto';
import { IProdottoResp } from '../models/IProdottoResp';
import { IUserResp } from '../models/IUserResp';
import { ClientiService } from '../services/clienti.service';
import { ProdottiClientiService } from '../services/prodotti-clienti.service';
import { ProdottiService } from '../services/prodotti.service';

@Component({
  selector: 'app-clienti',
  templateUrl: './clienti.component.html',
  styleUrls: ['./clienti.component.css']
})
export class ClientiComponent implements OnInit, OnDestroy {

  constructor(private clienti: ClientiService, private servizioProdotti: ProdottiService, private prodottiClienti: ProdottiClientiService) { }

  clientiSUB: Subscription | undefined;
  ProdottiSUB: Subscription | undefined;

  users: IUserResp[] = [];
  prodotti: any[] = [];

  prodottiFiltrati$ : Subscription | undefined;

  ngOnInit(): void {
    let user: IUserResp[] = [];
    this.clientiSUB = this.clienti.users().subscribe({
      next(resp) {
        resp.map(el => user.push(el))
      },
      error(err) {
        console.log(err);
      },
    })
    user = this.users;
  }

  ngOnDestroy(): void {
    this.clientiSUB?.unsubscribe;
    this.ProdottiSUB?.unsubscribe;
    this.prodottiFiltrati$?.unsubscribe;
  }

  callBody(user: IUserResp) {
    this.prodotti = []
    this.prodottiFiltrati$ = this.prodottiClienti.prodottiUser(user.id).pipe(
      map((el: any) => el.relazione.map((ele: any) => ele.prodottiId)),
      switchMap((e : number[]) => { return this.servizioProdotti.prodttiFiltrati(e) })
    ).subscribe(
      {
        next : (value) => {
          value.forEach(element => {
            this.prodotti.push(element)
          });
        },
      }
    )
  }
}
