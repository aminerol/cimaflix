import { Component } from '@angular/core';

@Component({
  selector: '.navbar',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = '';
  Searchtoggle : boolean = false;
  Menutoggle : boolean = false;

  ToggleSearch(event){
    this.Searchtoggle = !this.Searchtoggle;
    console.log(this.Searchtoggle);   
  }
  ToggleMenu(event){
    this.Menutoggle = !this.Menutoggle; 
    console.log(this.Menutoggle);       
  }
}