import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Component({
  selector: '',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  toDos: string[] =["Todo1","Todo2","Todo3","Todo1","Todo2","Todo3","Todo1","Todo2","Todo3","Todo1","Todo2","Todo3"];

  ngOnInit() {
  }

}
