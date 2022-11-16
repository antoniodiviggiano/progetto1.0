import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { InsermentoProdottoService } from '../services/insermento-prodotto.service';

@Component({
  selector: 'app-inserimento-prodotti',
  templateUrl: './inserimento-prodotti.component.html',
  styleUrls: ['./inserimento-prodotti.component.css']
})
export class InserimentoProdottiComponent implements OnInit {

  insermimentoProdotti = new FormGroup({
    nome: new FormControl("", [Validators.required, Validators.minLength(3)]),
    descrizone: new FormControl("", [Validators.required, Validators.minLength(3)]),
    prezzo: new FormControl("", [Validators.required, Validators.min(1)]),
  });

  constructor(private inserimento : InsermentoProdottoService) { }

  ngOnInit(): void {
  }

  inserisciProdotti(){

    this.inserimento.insermento


    this.insermimentoProdotti.reset();
    
  }

}
