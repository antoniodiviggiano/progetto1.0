import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { IProdottoResp } from '../models/IProdottoResp';

import { ProdottiService } from '../services/prodotti.service';

@Component({
  selector: 'app-tabellaprodotti',
  templateUrl: './tabellaprodotti.component.html',
  styleUrls: ['./tabellaprodotti.component.css']
})
export class TabellaprodottiComponent implements OnInit, OnChanges {

  prodotti: IProdottoResp[] = []

  constructor(private servizioProdotti : ProdottiService) {
    
   }

  ngOnChanges(changes: SimpleChanges): void {
    this.listaProdotti();
  }

  ngOnInit(): void {
    this.listaProdotti();
  }

  listaProdotti() {
    this.servizioProdotti.prodotti().subscribe({
      next: (resp) => {
      resp.map(el => {
        this.prodotti.push(el)
        console.log(resp);
        
        });
      },
      error: (err) => console.log(err),
    })
  }
}
