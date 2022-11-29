import { Component, OnDestroy, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { interval, Subscription, switchMap } from 'rxjs';
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
  idProdotti: number[] = [];
  prodotti: IProdottoResp[] = [];
  idClick : number = -1;
  flag : boolean = true;

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
  }

  callBody(user: IUserResp) {
    
    let prodotti: IProdottoResp[] = [];

    this.ProdottiSUB = this.servizioProdotti.prodotti().pipe(
      switchMap(() => {
        return this.prodottiClienti.prodottiUser(user.id).pipe()
      })
    ).subscribe({
      next: (val) => {
        this.servizioProdotti.prodotti().subscribe({
          next(value) {
            val.relazione.forEach((element: any) => {
              value.filter(el => el.id === element.prodottiId).map(e => prodotti.push(e))
            });
          },
        })
      },
      error(err) {
        console.log(err);
      },
    })

    this.prodotti = prodotti
    

  }
}
