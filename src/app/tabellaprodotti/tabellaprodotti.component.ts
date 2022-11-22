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
  flag : boolean = false;
  id : number = -1;
  login : boolean = false;

  @Input() cambiamento: boolean | undefined;

  press: boolean[] = [false];

  constructor(private fb: FormBuilder,
    private servizioProdotti: ProdottiService,
    private deleteProdotti: DeleteProdottiService,
    private updateProdotti: UpdateProdottiService,
    private auth: AuthService) { }

    formModifica = new FormGroup({
      nome: new FormControl("", [Validators.required, Validators.minLength(3)]),
      descrizione: new FormControl("", [Validators.required, Validators.minLength(3), Validators.maxLength(75)]),
      prezzo: new FormControl("", [Validators.required, Validators.min(0.01)]),
    });



  ngOnChanges(changes: SimpleChanges): void {
    changes['cambiamento'];
    this.listaProdotti();
  }

  ngOnInit(): void {
    this.auth.login$.subscribe(
      resp => this.login = resp
    );
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

  modifica(id: number) {

    let prodottoModificato : IProdotto = {
      nome: this.formModifica.controls.nome.value!,
      descrizione: this.formModifica.controls.descrizione.value!,
      prezzo: this.formModifica.controls.prezzo.value!,
    }
   
    this.updateProdotti.update({ id: id, ...prodottoModificato }).subscribe({
      next(resp) {
        console.log(resp); 
      },
      error(err) {
        console.log(err);
      }
    });
    this.flag = false;
    this.listaProdotti();
  }

  rigaSelezionata(id : number){
    this.id = id;
    this.flag = !this.flag
  }
}



