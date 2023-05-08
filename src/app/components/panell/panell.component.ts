import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DataService } from 'src/app/data.service';

import { interfaceBudget } from 'src/app/interfaces/servicePageWeb.interface';

@Component({
  selector: 'app-panell',
  templateUrl: './panell.component.html',
  styleUrls: ['./panell.component.css']
})
export class PanellComponent implements OnInit {

  constructor(
    public dataS : DataService,
    public formBuilder: FormBuilder){
  }

  //CREATION DU FORMGROUP:
  public pagesWebForm :FormGroup = new FormGroup({
    numPagesCtrl: new FormControl(0, Validators.required),
    numIdiomasCtrl: new FormControl(0), //nonNullable:true}Superhero siempre va ser una string

  });

  public formIsValid: boolean = false;

  public formulaire!: FormGroup;
  public totalDetailServiceWeb!: number;

  public quantityLang : number = 0;
  public quantityPag  : number = 0;

  public donneesFormulaireServiceWeb: any = {};

  public detailPagWEB:number = 0
  public detailPagWEB_2:number = 0

  public checkValid: boolean = false;

  get currentBudget():interfaceBudget {
    const budgetWeb = this.pagesWebForm.value as interfaceBudget;
    console.log("budget - ",  budgetWeb);
    console.table({
      //formIsValid: this.pagesWebForm.valid,
      NombdeDePag: this.pagesWebForm.value.numPagesCtrl,
      NombreDeLang: this.pagesWebForm.value.numIdiomasCtrl,
    });

    return budgetWeb
  }



  // Missatge error a l'HTML si no passa validació
  showValidationMsg(inputUser: string) {
    return this.pagesWebForm.controls[inputUser].errors;
  }






// METHODE pour recevoir ET TRAITER les données reçues dans le FORM
//TODO : find a way to extract them
  totalWebOpcions() {
    this.quantityPag = +this.pagesWebForm.get('numPagesCtrl')?.value;

    this.quantityLang = +this.pagesWebForm.get('numIdiomasCtrl')?.value;


  }


  ngOnInit(): void {

  }



onSubmit() {

if (this.pagesWebForm.validator) {console.log("this.pagesWebForm.valueChanges  -  ", this.pagesWebForm.valueChanges.forEach( e => console.log(e)));};
if (this.currentBudget.web) {

  console.log('this.currentBudget.web: ', this.currentBudget.web);
}

  //this.cridarServeiOpcionsWeb()
  this.quantityPag = Number(this.pagesWebForm.get("numPagesCtrl")?.value);
  console.log("this.quantityPag   - ", this.quantityPag);

  this.quantityLang = Number(this.pagesWebForm.get('numIdiomasCtrl')?.value);

  this.donneesFormulaireServiceWeb ={
  quantityLang : Number(this.pagesWebForm.value.numIdiomasCtrl),
  quantityPag : Number(this.pagesWebForm.value.numPagesCtrl),
  totalDetailServiceWeb : Number(this.pagesWebForm.value.numIdiomasCtrl) * Number(this.pagesWebForm.value.numPagesCtrl) * 30
};

console.table( this.donneesFormulaireServiceWeb);


  return this.detailPagWEB_2
}

  // Enviem Total Opcions Web & Validacio del Form al component pare "Home" amb @Output

  @Output()
  output_detailPagWeb = new EventEmitter<number>();
  onPropagar( ) {
    return this.output_detailPagWeb.emit(this.detailPagWEB);
  }


  sumDetailtoOutput = () => {
     //this.counterIdiomas * this.counterPaginas * 30
     return this.dataS.Service_totalWebPagesResult(this.counterIdiomas, this.counterPaginas)
  }

  // ****************** GETTER & SETTERS for the PLACEHOLDER  ******************
  private _counterPaginas!: number;
  private _counterIdiomas!: number;


  get theCounterPag(){
    return this.counterPaginas
  }
  set theCounterPag(counterPaginas : number){
     this._counterPaginas = counterPaginas;
      console.log("this._counterPaginas - ", this._counterPaginas);
  }
  get theCounterIdiomas(){
    return this.counterIdiomas
  }
  set theCounterIdiomas(counterIdiomas : number){
     this._counterIdiomas = counterIdiomas;
      console.log("this._counterIdiomas - ", this._counterIdiomas);
  }


@Output() detailPagWEB_Emitter : EventEmitter<any> = new EventEmitter()
emit_detailPagWEB = ()  => {
  this.detailPagWEB_Emitter.emit(this.sumDetailtoOutput())
}

// --------------- https://ultimatecourses.com/blog/component-events-event-emitter-output-angular-2

public counterPaginas: number = 0;
public counterIdiomas: number = 0;


// -------------- INCREASE / DECREASE PAGES BUTTONS --------------
decreaseByPage(value: number):void {
  this.counterPaginas += value;
  this.quantityPag += value;

}
increaseByPage(value: number):void {
  this.counterPaginas += value ;
  this.quantityPag += value

}
// -------------- INCREASE / DECREASE LANGUAGES BUTTONS --------------
decreaseByLanguage(value: number):void {

  this.counterIdiomas += value;
  this.quantityLang += this.counterIdiomas;
 }

 increaseByLanguage(value: number):void {
  this.counterIdiomas += value;
  this.quantityLang += value;
}



/* resetCounter() {
  this.counterIdiomas = 0;
  this.counterPaginas = 0;
} */

}
