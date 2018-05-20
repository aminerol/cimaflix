import { Component, OnInit, NgZone } from '@angular/core';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  msgs = ['aa', 'bb'];

  constructor(private zone: NgZone) { }

  ngOnInit() {
  }

  send(msg: string) {
    // this.msgs.push(msg);
  };

}
