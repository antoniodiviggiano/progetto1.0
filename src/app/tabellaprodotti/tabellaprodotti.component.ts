import {
  AfterViewInit,
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { select, Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { Subscription } from "rxjs/internal/Subscription";
import { AuthService } from "../auth/auth.service";
import { isLoggedIn } from "../auth/selectors/auth.selectors";
import { IProdotto } from "../models/IProdotto";
import { IProdottoResp } from "../models/IProdottoResp";
import { AppState } from "../reducers";
import { DeleteProdottiService } from "../services/delete-prodotti.service";

import { ProdottiService } from "../services/prodotti.service";
import { UpdateProdottiService } from "../services/update-prodotti.service";
import { elimina, modifica, visualizza } from "./action/tabellaprodotti.action";
import { prodottiSelector } from "./selectors/tabellaprodotti.selectors";

@Component({
  selector: "app-tabellaprodotti",
  templateUrl: "./tabellaprodotti.component.html",
  styleUrls: ["./tabellaprodotti.component.css"],
})
export class TabellaprodottiComponent implements OnInit,OnDestroy {

  deleteProdottiSub: Subscription | undefined;

  prodotti$!: Observable<any> 
  logged$!: Observable<any> 

  prodotti: IProdottoResp[] = [];
  i: number = 1;
  flag: boolean = false;
  id: number = -1;
  flagMobile: boolean | undefined;

  mobileEdit: boolean = false;
  mobileDelete: boolean = false;

  constructor(
    private servizioProdotti: ProdottiService,
    private deleteProdotti: DeleteProdottiService,
    private updateProdotti: UpdateProdottiService,
    private store: Store<AppState>
  ) { }
  
  formModifica = new FormGroup({
    nome: new FormControl("", [Validators.required, Validators.minLength(3)]),
    descrizione: new FormControl("", [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(75),
    ]),
    prezzo: new FormControl("", [Validators.required, Validators.min(0.01)]),
  });

  ngOnInit(): void {
    this.servizioProdotti.prodotti().subscribe({
      next: (prodotti) => {
          this.prodotti = prodotti
          this.store.dispatch(visualizza({prodotti}))
      },
    })

    this.prodotti$ = this.store.pipe(
      select(prodottiSelector)
    )

    this.logged$ = this.store.pipe(
      select(isLoggedIn)
    )

    
  }

  onDeleteProdotti(id: number) {
   if (!this.deleteProdottiSub || this.deleteProdottiSub.closed) {
      this.deleteProdottiSub = this.deleteProdotti
        .onDelete(id)
        .subscribe(() =>
        this.store.dispatch(elimina({id})))
    }  
  }

  ngOnDestroy(): void {
    this.deleteProdottiSub?.unsubscribe();
  }

  modifica(id: number) {

    let prodottoModificato: IProdotto = {
      nome: this.formModifica.controls.nome.value!,
      descrizione: this.formModifica.controls.descrizione.value!,
      prezzo: this.formModifica.controls.prezzo.value!,
    };

   

    this.updateProdotti.update({ id: id, ...prodottoModificato }).subscribe({
      next: (value) => {
        this.prodotti = this.prodotti!.filter(el => el.id !== id)
        this.store.dispatch(modifica({prodotto: [...this.prodotti, value] }))
      },
     
    });

    this.flag = false;

    this.flagMobile = false;
    this.mobileEdit = false;
    this.formModifica.reset();
  }

  rigaSelezionata(prodotto: IProdottoResp) {
    this.id = prodotto.id;
    this.flag = !this.flag;

    this.formModifica.controls.nome.setValue(prodotto.nome);
    this.formModifica.controls.descrizione.setValue(prodotto.descrizione);
    this.formModifica.controls.prezzo.setValue(prodotto.prezzo);
  }

  onclickMobile(str: string, prodotto: IProdottoResp) {
    if (str === "edit") {
      this.mobileEdit = !this.mobileEdit;
      this.mobileDelete = false;
      this.formModifica.controls.nome.setValue(prodotto.nome);
      this.formModifica.controls.descrizione.setValue(prodotto.descrizione);
      this.formModifica.controls.prezzo.setValue(prodotto.prezzo);
    } else if (str === "delete") {
      this.mobileDelete = true;
      this.mobileEdit = false;
    }
  }
}
