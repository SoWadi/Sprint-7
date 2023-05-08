import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DataService } from 'src/app/data.service';

@Component({
  selector: 'app-panell',
  templateUrl: './panell.component.html',
  styleUrls: ['./panell.component.css']
})
export class PanellComponent implements OnInit {



  //CREATION DU FORMGROUP:
  /* public pagesWebForm :FormGroup = new FormGroup({
    numPages: new FormControl(""),
    numIdiomas: new FormControl(""), //nonNullable:true}Superhero siempre va ser una string

  });
   */

    panellFormulari: FormGroup = this.formBuilder.group({
      numPagesCtrl: [0, [Validators.required, Validators.min(1)]],
      numIdiomasCtrl: [0, [Validators.required, Validators.min(1)]],
    });


  // Importem del component pare el valor "faltenDades" per mostrar o no missatge d'error al panell
  @Input('checkSub') faltenDades!: boolean;

  // Missatge error a l'HTML si no passa validació
  showValidationMsg(inputUser: string) {
    console.log("inputUser - ",  inputUser);
    return this.panellFormulari.controls[inputUser].errors;
  }


  public formulaire!: FormGroup;
  public detailWEBEUH: any;
  public totalDetailServiceWeb!: number;

  public quantityLang : number = 0;
  public quantityPag  : number = 0;

  public donnees: any = {};

  public detailPagWEB:number = 0
  public detailPagWEB_2:number = 0

  public checkValid: boolean = false;
  constructor(
    public dataS : DataService,
    public formBuilder: FormBuilder){
  }



  // Mètode que retorna el Total Opcions Web utilitzant el servei
  totalWebOpcions() {
    this.quantityPag = +this.panellFormulari.get('numPagesCtrl')?.value;

    this.quantityLang = +this.panellFormulari.get('numIdiomasCtrl')?.value;
    //this.cridarServeiOpcionsWeb();

  }


/*   cridarServeiOpcionsWeb() {
    if (this.quantityPag < 1 || this.quantityLang < 1) {

      //this.totalDetailServiceWeb = 0;
      this.checkValid = false;
    } else {
      this.totalDetailServiceWeb = this.dataS.Service_totalWebPagesResult(
        this.quantityPag,
        this.quantityLang
      );
      this.checkValid = true;
    }
    console.log('Checkvalid', this.checkValid);
  } */

  ngOnInit(): void {

  }





/*   //get valeur du formControl*NAME*
get numPagesValue():number{
  this.quantityPag = Number(this.panellFormulari.get("numPages")?.value);

  console.log("this.quantityLang  - ", this.quantityPag);

  return this.quantityPag
} */

// METHODE pour recevoir ET TRAITER les données reçues dans le FORM
//TODO : find a way to extract them

onSubmit() {

  //this.cridarServeiOpcionsWeb()
  this.quantityPag = Number(this.panellFormulari.get("numPagesCtrl")?.value);
  console.log("this.quantityPag   - ", this.quantityPag);

  this.quantityLang = Number(this.panellFormulari.get('numIdiomasCtrl')?.value);

  this.donnees ={
  quantityLang : Number(this.panellFormulari.value.numIdiomas),
  quantityPag : Number(this.panellFormulari.value.numPages),
  totalDetailServiceWeb : Number(this.panellFormulari.value.numIdiomas) * Number(this.panellFormulari.value.numPages) * 30
};

console.log("this.donnees  - ", this.donnees);
/*
 this.dataS.envoyerDonnees(this.donnees)
.subscribe(() => {
  // gérer la réponse du service
  console.log("donnees.exploiteNumIdiomas: ");
}) */

  //console.log("totalDetailServiceWeb:",  this.totalDetailServiceWeb); ==> devuelve undefined
  //console.log(this.donnees.totalDetailServiceWeb);
this.detailPagWEB_2 = this.donnees.totalDetailServiceWeb
console.log("this.detailPagWEB_2  - ", this.detailPagWEB_2);

console.log('this.detailPagWEBEUH_2: ', this.detailPagWEB_2);
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
     console.log("this.quantityLang -  ", this.quantityLang);
     console.log("this.counterIdiomas -  ", this.counterIdiomas);
     console.log("this.quantityPag -  ", this.quantityPag);
     console.log("this.counterPaginas -  ", this.counterPaginas);
     return this.dataS.Service_totalWebPagesResult(this.counterIdiomas, this.counterPaginas)
  }



@Output() detailPagWEB_Emitter : EventEmitter<any> = new EventEmitter()
emit_detailPagWEB = ()  => {
  this.detailPagWEB_Emitter.emit(this.sumDetailtoOutput())
}

// --------------- https://ultimatecourses.com/blog/component-events-event-emitter-output-angular-2

public increment_detailPagWEBEUH = this.detailPagWEB   + 1;
@Input()
count: number = 0;

@Output()
//change: EventEmitter<number> = new EventEmitter<number>();

/*  */
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
  this.quantityLang = this.counterIdiomas;
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
