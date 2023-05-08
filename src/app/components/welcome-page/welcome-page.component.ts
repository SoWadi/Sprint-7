import { Component } from '@angular/core';

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.css']
})
export class WelcomePageComponent {

  gifUrl: string = "https://media.tenor.com/kGLtwrHTLVMAAAAC/flea-sexy-dance.gif";
  displayStyle:boolean = true;
  public doDisplay:string = this.displayStyle?  "display: block" : "display: none"

  funcDisplay(){
    this.displayStyle = !this.displayStyle
    console.log(this.displayStyle);
  }
}
