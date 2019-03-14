import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})

export class NavbarComponent implements OnInit {

  modalState: string|null = null;
  constructor() { }

  @Input() loggedIn: boolean;
  @Input() username: string;
  @Input() signup: Function;
  @Input() login: Function;
  @Input() logout: Function;
  setModal = (status: string|null): void => {
    this.modalState = status;
  }

  ngOnInit() {
  }

}
