import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray } from '@angular/forms';
import { AuthService } from '../auth/auth.service';
import { IProdotto } from '../models/IProdotto';
import { IProdottoResp } from '../models/IProdottoResp';
import { DeleteProdottiService } from '../services/delete-prodotti.service';

import { ProdottiService } from '../services/prodotti.service';
import { UpdateProdottiService } from '../services/update-prodotti.service';

@Component({
  selector: 'app-tabellaprodotti',
  templateUrl: './tabellaprodotti.component.html',
  styleUrls: ['./tabellaprodotti.component.css']
})
export class TabellaprodottiComponent implements OnInit, OnChanges {

  isLogged: boolean = false;
  prodotti: IProdottoResp[] = [];
  i: number = 1;

  prodotto: IProdotto = {
    nome: '',
    descrizione: '',
    prezzo: ''
  }

  @Input() cambiamento: boolean | undefined;

  press: boolean[] = [false];

  constructor(private fb: FormBuilder,
    private servizioProdotti: ProdottiService,
    private deleteProdotti: DeleteProdottiService,
    private updateProdotti: UpdateProdottiService,
    private auth: AuthService) { }



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

  onDeleteProdotti(id: number) {
    this.deleteProdotti.onDelete(id)
    this.listaProdotti()
  }

  onEditProdotti(id: number) {

    const nome = document.querySelector('#nome')! as HTMLInputElement
    const descrizione = document.querySelector('#desc')! as HTMLInputElement;
    const prezzo = document.querySelector('#prezzo')! as HTMLInputElement;

    this.prodotto = {
      nome: nome.value,
      descrizione: descrizione.value,
      prezzo: prezzo.value
    }

    this.updateProdotti.update({ id: id, ...this.prodotto }).subscribe({
      next(resp) {
      },
      error(err) {
      }
    });

    this.press[id] = !this.press
    this.listaProdotti();
  }

  onPressEdit(i: number) {
    this.press[i] = !this.press[i]
    console.log(this.press[i - 1])
  }

}

