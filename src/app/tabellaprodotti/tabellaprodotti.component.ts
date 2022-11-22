import { HttpClient } from '@angular/common/http';
import { Component, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';
import { AuthService } from '../auth/auth.service';
import { IProdottoResp } from '../models/IProdottoResp';
import { DeleteProdottiService } from '../services/delete-prodotti.service';

import { ProdottiService } from '../services/prodotti.service';

@Component({
  selector: 'app-tabellaprodotti',
  templateUrl: './tabellaprodotti.component.html',
  styleUrls: ['./tabellaprodotti.component.css']
})
export class TabellaprodottiComponent implements OnInit,OnChanges, OnDestroy {

  isLogged : boolean = false;

  deleteProdottiSub : Subscription | undefined;
  

  prodotti: IProdottoResp[] = [];
  i : number = 1;

  @Input() cambiamento: boolean | undefined;

  constructor(private servizioProdotti : ProdottiService, private deleteProdotti: DeleteProdottiService, private auth : AuthService ) {
    
  }
  
  ngOnChanges(changes: SimpleChanges): void {
    changes['cambiamento'];
    this.listaProdotti();
  }

  ngOnInit(): void {
    this.isLogged = this.auth.isAuth();
  }

  listaProdotti() {
    this.prodotti = [];
    this.servizioProdotti.prodotti().subscribe({
      next: (resp) => {
      resp.map(el => {

        this.prodotti.push(el)
        });
      },
      error: (err) => console.log(err),
    })
  }

  onDeleteProdotti(id: number){

    if (!this.deleteProdottiSub || this.deleteProdottiSub.closed) {
   this.deleteProdottiSub = this.deleteProdotti.onDelete(id).subscribe( () => this.listaProdotti() )
    }

  }

  ngOnDestroy(): void {
    this.deleteProdottiSub?.unsubscribe();
  }



}
