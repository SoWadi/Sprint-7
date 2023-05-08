import { Component, Input, Output, EventEmitter } from '@angular/core';
import { DataService } from 'src/app/data.service';
import { Budget } from 'src/app/interfaces/monInterface';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [
  ]
})
export class HomeComponent {
  detailWebServ: number = 0;
  totalPagWebServ: number = 0;
  totalServicios: number = 0;

  constructor(public dataS : DataService){}



  public priceGAds: number = 0;
  public pricePagWeb: number = 0;
  public priceSeo: number = 0;
  public totalPreu: number = 0;
  public isPageWebCheck: boolean = false

  public precioActualizado:number = 0
  //public varNewBudget: Budget[] = []

  public newBudget:Budget={
    PagesWeb: 0,
    GADS: 0,
    Seo: 0,
    Total: 0
  } ;
public varNewBudget:Budget={
  PagesWeb: 0,
  GADS: 0,
  Seo: 0,
  Total: 0
} ;



budgetList :Budget[] = []
budgetList2 :Budget[] = []
//TODO : REMPLCACE par appel service - Service_emitcheckPagWeb
Component_emitcheckPagWeb(e: any){
  this.dataS.Service_emitcheckPagWeb(e);
  //this.dataS.Service_calcTotalPreu();


}



//TODO : REMPLCACE par appel service - Service_emitcheckGAds
Component_emitcheckSeo(e: any){
  this.dataS.Service_emitcheckSeo(e);
  //this.dataS.Service_calcTotalPreu()
}


//TODO : REMPLCACE par appel service - Service_emitcheckGAds
Component_emitcheckGAds(e: any){
  this.dataS.Service_emitcheckGAds(e);
  //this.dataS.Service_calcTotalPreu()
}

//TODO : REMPLCACE par appel service - Service_budgetName
Component_emitBudgetName(e: string){
  let x_ = this.dataS.Service_budgetName(e);
  console.log("x_  - ", x_);
  //this.dataS.Service_calcTotalPreu()
}


//DONE : REMPLACE par appel service - Service_calcTotalPreu
Component_calcTotalPreu = () => {  //Ceci est une property (non une méthode)
  this.totalPreu += this.dataS.getTotalService

  return console.log(this.totalPreu);

};

// RECUPERE LE BOOLEAN DES PAGES WEB
Component_isPageWebCheck = () => {
  this.isPageWebCheck = this.dataS.iscHecked;
  return this.isPageWebCheck}



// S'ACTIVE UNIQUEMENT SI JE TOUCHE AU NUM PAGE/IDIOM
methodePadre_onTotalWebServ(valor: number) {
  //this.Component_calcTotalPreu()
  this.detailWebServ = valor;
  this.totalPagWebServ += this.detailWebServ;

  return this.totalPreu

}


// ------------------ OBTENTION DETAIL DES SERVICES WEB: ------------------
public retrieveDetailPageWeb: number = 0;

metodePadre_retrieveDetailPageWeb =  (retrieveDetailPageWeb_p: number) => {

  console.log(retrieveDetailPageWeb_p);
  this.retrieveDetailPageWeb = retrieveDetailPageWeb_p;
  this.retrieveDetailPageWeb
  return this.retrieveDetailPageWeb

  ;
}


onTotalPagWebServ(valor: number) {
  this.totalPagWebServ = valor;
  this.totalPagWebServ = this.totalServicios + this.totalPagWebServ;
  console.log(this.totalPagWebServ, this.totalServicios );
  return this.totalPagWebServ
}


myCount: number = 10;
countChange(event:number) {
  //console.log("event: ",  event);
  this.myCount = event;
  this.totalPreu
  this.dataS.Service_calcTotalPreu()

}


// VALEUR pour afficher le total en bas de la div
totalPresupuesto = ():number =>{
  this.precioActualizado = this.dataS.Service_calcTotalPreu();
  console.log("precioActualizado - ", this.precioActualizado);
  return this.precioActualizado

}
//testObjet(), debugging, affichage |json

metodePadre_saveDetailBudget = () => {
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

// Create Objet Budget
padre_createObjetBudget():Budget{
console.log("this.dataS.Service_createObjetBudget() - ", this.dataS.Service_createObjetBudget());
  this.varNewBudget = this.dataS.Service_createObjetBudget();

  // ACTUALIZE PRECIO TOTAL
this.varNewBudget.Total += this.retrieveDetailPageWeb;
console.log("this.varNewBudget - ", this.varNewBudget);
  return this.varNewBudget;

}

}
