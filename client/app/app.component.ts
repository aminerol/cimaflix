import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: '.navbar',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = '';
  query = '';
  Searchtoggle : boolean = false;
  Menutoggle : boolean = false;

  constructor(private _router: Router) {
    
  }
  ToggleSearch(event){
    this.Searchtoggle = !this.Searchtoggle;
  }
  ToggleMenu(event){
    this.Menutoggle = !this.Menutoggle; 
  }

  onSubmit() {
    if(this.query){
      this._router.navigate(['search', this.query]);
    }
  }
}