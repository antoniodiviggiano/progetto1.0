import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ICocktail } from '../models/ICocktail';
import { ThisReceiver } from '@angular/compiler';
@Component({
  selector: 'app-cocktail',
  templateUrl: './cocktail.component.html',
  styleUrls: ['./cocktail.component.css']
})
export class CocktailComponent implements OnInit {

  constructor(private httpClient:HttpClient) { }

  ngOnInit(): void {
    this.callHttp();
  }

  cocktail:ICocktail={
    id:0,
    nome:"",
    immagine:"",
    ricetta:""


  }

  callHttp(){
    this.httpClient.get<any>("https://www.thecocktaildb.com/api/json/v1/1/random.php").subscribe({
      next: data => {
         console.log(data.drinks[0]);
         
         this.cocktail.nome=data.drinks[0].strDrink;
         this.cocktail.id=data.drinks[0].idDrink;
         this.cocktail.immagine=data.drinks[0].strDrinkThumb;
         this.cocktail.ricetta=data.drinks[0].strInstructionsIT;

         console.log(this.cocktail.nome,this.cocktail.id,this.cocktail.immagine,this.cocktail.ricetta);
         
         
         
         
         
        // this.cocktail=data
         //this.cocktail.nome=data.nome;
         //console.log(this.cocktail.nome);
        //this.users=data;
        //console.log(this.users.lyrics);
        //this.testo=this.users.lyrics.replace(/\n/g, '<br/>');
        //this.users=data;
        //this.users.map(user=>console.log(user.id,user.name))
        //this.users.map(user=>console.log())
      },
      error: error => {
        console.error(error);
      },
      complete: () => {
        console.log("completed");
      }
    })
  }

}
