import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { IProdotto } from '../models/IProdotto';
import { InsermentoProdottoService } from '../services/insermento-prodotto.service';

@Component({
  selector: 'app-inserimento-prodotti',
  templateUrl: './inserimento-prodotti.component.html',
  styleUrls: ['./inserimento-prodotti.component.css']
})
export class InserimentoProdottiComponent implements OnInit {

  @Output() inserimento = new EventEmitter<boolean>;

  insermimentoProdotti = new FormGroup({
    nome: new FormControl("", [Validators.required, Validators.minLength(3)]),
    descrizone: new FormControl("", [Validators.required, Validators.minLength(3), Validators.maxLength(75)]),
    prezzo: new FormControl("", [Validators.required, Validators.min(0.01)]),
  });

  constructor(private service : InsermentoProdottoService,) { }

  ngOnInit(): void {
  }

  inserisciProdotti(){

    const prodotto: IProdotto = {
      nome: this.insermimentoProdotti.value.nome as string,
      descrizione: this.insermimentoProdotti.value.descrizone as string,
      prezzo: this.insermimentoProdotti.value.prezzo as string,
    };
    
    this.service.insermento(prodotto).subscribe({
      next: (resp) => {
        this.insermimentoProdotti.reset();
        this.inserimento.emit();

      },
      error: (err) => console.log(err),
    });
  }

}
