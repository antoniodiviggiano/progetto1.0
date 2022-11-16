import { Component, OnInit } from '@angular/core';
import { data } from 'cypress/types/jquery';
import { IProdottoResp } from '../models/IProdottoResp';
import { ProdottiService } from '../services/prodotti.service';

@Component({
  selector: 'app-tabellaprodotti',
  templateUrl: './tabellaprodotti.component.html',
  styleUrls: ['./tabellaprodotti.component.css']
})
export class TabellaprodottiComponent implements OnInit {

  prodotti: IProdottoResp[] = []

  constructor(private servizioProdotti : ProdottiService) {
    
   }

  ngOnInit(): void {
    this.listaProdotti();
  }

  listaProdotti() {
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
