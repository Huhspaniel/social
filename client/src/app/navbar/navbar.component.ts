import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})

export class NavbarComponent implements OnInit {

  constructor() { }

  @Input() loggedIn: boolean;
  @Input() user: { username: string, id: number } | null;
  @Input() signup: Function;
  @Input() login: Function;
  @Input() logout: Function;
  @Input() modalState: string;
  @Input() setModal: Function;

  ngOnInit() {
  }

}
