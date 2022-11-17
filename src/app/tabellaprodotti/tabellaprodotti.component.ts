import { Component, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { IProdottoResp } from '../models/IProdottoResp';

import { ProdottiService } from '../services/prodotti.service';

@Component({
  selector: 'app-tabellaprodotti',
  templateUrl: './tabellaprodotti.component.html',
  styleUrls: ['./tabellaprodotti.component.css']
})
export class TabellaprodottiComponent implements OnInit,OnChanges {

  prodotti: IProdottoResp[] = [];
  i : number = 1;

  @Input() cambiamento: boolean | undefined;

  constructor(private servizioProdotti : ProdottiService) {
    
  }
  ngOnChanges(changes: SimpleChanges): void {
    changes['cambiamento'];
    this.listaProdotti();
  }

  ngOnInit(): void {
    
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
}
