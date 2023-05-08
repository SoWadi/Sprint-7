import { Injectable, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';

import { interfaceBudget } from './interfaces/servicePageWeb.interface';
import { Budget } from './interfaces/monInterface';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  public budget    : Budget [] = []
  public newBudget : Budget [] = []
  constructor(){

    //this.budgetList = localStorage.getItem('budgetList')  ?  JSON.parse(localStorage.getItem('budgetList')! ) :  []

  }


      contadorID: number = 0;

      // Declarem array amb 2 presupostos d'exemple
      llistatPresusArray: Budget[] = [];

  saveDetailBudget(){

    let budget: interfaceBudget = {


      web         : this.pricePagWeb,
        pages     : this.quantityPages,
        languages : this.quantityLang,

      seo         : this.priceSeo,
      ads         : this.priceGAds,


    }

    console.log("budget: ", budget);
  }

  envoyerDonnees(donnees: any): Observable<any> {
    return donnees; // Envoyer les données du formulaire à l'API avec une requête POST

  }
//-----------------------------
  @Output()
  public onValueCheck = new EventEmitter<boolean>();

  @Output()
  public onValueNameBudget = new EventEmitter<string>();

  public pricePagWeb: number = 0;
  public priceSeo: number = 0;
  public priceGAds: number = 0;

  public isPageWebCheck: boolean = false;
  public isSeoCheck: boolean = false;
  public isGAdsCheck: boolean = false;

  public varS_totalChexboxes: number = 0;

  public quantityPages : number = 0;
  public quantityLang  : number = 0;
  public totalWebPages : number = 0;

  public exploiteNumIdiomas?:number
  public exploiteNumPaginas?: number;
  public totalDetailServiceWeb?: number;

  public nameBudget:string = "";





  Service_totalWebPagesResult(_quantityPages:number, _quantityLang:number){

    this.totalWebPages = _quantityLang * _quantityPages * 30;

   // this.totalWebPages = (this.quantityPages * this.quantityLang) * 30
    console.log("this.totalWebPages - ", this.totalWebPages);
    return this.totalWebPages

  }


  // -------------------------- PAGE WEB --------------------------
  Service_emitcheckPagWeb(value:any) :void{
    this.onValueCheck.emit( value );

    this.pricePagWeb = value.currentTarget.checked ? 500 : 0;
    this.isPageWebCheck = value.currentTarget.checked;
    //this.Service_calcTotalPreu()

    this.isPageWebCheck = value.currentTarget.checked
    this.varS_totalChexboxes += this.pricePagWeb;


  }


  // -------------------------- SEO --------------------------
// RECUPERE VALEURS CHECKBOX SEO: bool + price => cout total
  Service_emitcheckSeo(value:any) :void{
    this.onValueCheck.emit( value );

    this.priceSeo = value.currentTarget.checked ? 300 : 0;
    this.isSeoCheck = value.currentTarget.checked
    console.log("this.priceSeo",  this.priceSeo , " | this.isSeoCheck:", this.isSeoCheck );
    this.Service_calcTotalPreu();

    //console.log(this.saveDetailBudget(value), "DEVUELVE UNDEFINED");

}

  // -------------------------- GOOGLE ADS --------------------------
// RECUPERE VALEURS CHECKBOX GOOGLE ADS: bool + price => cout total
Service_emitcheckGAds(value:any){
  this.onValueCheck.emit( value );

  this.priceGAds = value.currentTarget.checked ? 200 : 0;
  this.isGAdsCheck = value.currentTarget.checked


  this.Service_calcTotalPreu()
  return this.priceGAds
}

Service_budgetName(val:string){
  this.onValueNameBudget.emit( val );
  this.nameBudget = val;
  console.log("nameBudget - ", this.nameBudget);
}

// -------------------------- TOTAL PREU --------------------------

/*   // METODE QUI JOINT TOUT POUR LES UTILISER dans le COMPONENT PADRE : laMéthodePadre_ensembleCheckboxes(){}:
    laPropiétéPadre_ensembleCheckboxes = ()=> {
      console.log("this.priceGAds  -   ",  this.priceGAds);
      ...
      }

 */

      // Afegir pressupost al llistat de pressupostos
      arrayPresus(PagesWeb: any, GADS: any, Seo: any, Total:number) {
        // Agagfem l'id amb el comptador
        let id = this.contadorID + 1;
        this.contadorID += 1;
        // Fem push
        this.llistatPresusArray.push({PagesWeb, GADS, Seo, Total });
        console.log(this.llistatPresusArray);
        // Enviem al localStorage del navegador
        //this.saveToLocalStorage(this.llistatPresusArray);
      }


Service_calcTotalPreu = ():number =>{

  this.varS_totalChexboxes = this.priceGAds + this.pricePagWeb + this.priceSeo;
  return this.varS_totalChexboxes + this.totalWebPages;
}

Service_createObjetBudget (){
  let newBudget:Budget = {
    PagesWeb: this.pricePagWeb,
    GADS: this.priceGAds,
    Seo: this.priceSeo,
    //TODO: AJOUTER LES PAGES A L'OBJET AINSI QUE LES TOTAUX
    Total: this.varS_totalChexboxes + this.totalWebPages
  }
console.log("newBudget - ", newBudget);
return newBudget
}

// -------------------------- GETTER TOTAL PREU --------------------------

get getTotalService(){
//this.getBoolDesCheckboxes()
console.log("METODE get totalService dans dataService = this.Service_calcTotalPreu(): ", this.Service_calcTotalPreu());
  this.Service_createObjetBudget()
  return this.Service_calcTotalPreu()
}

  // -------------------------- isPageWebCheck: activate panell component --------------------------
get iscHecked () {
  return this.isPageWebCheck }

//METHODE SERVICE POUR CRÉER NEW BUDGWRT LIST
/* metodePadre_saveDetailBudget = () => {
  this.dataS.saveDetailBudget();
  this.dataS.arrayPresus;
  let newBudget:Budget = {
    PagesWeb: this.pricePagWeb,
    GADS: this.priceGAds,
    Seo: this.priceSeo,
    Total: this.precioActualizado
  };


  this.budgetList.push(this.varNewBudget);
  console.log("this.budgetList - ", this.budgetList);

}
 */

}
