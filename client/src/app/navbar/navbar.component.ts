import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})

export class NavbarComponent implements OnInit {

  constructor() { }

  @Input() loggedIn: boolean;
  @Input() username: string;
  @Output() login = new EventEmitter<object>();
  @Output() logout = new EventEmitter();

  modalStatus: string|null = null;
  setModalStatus(status: string|null) {
    this.modalStatus = status;
  }

  ngOnInit() {
  }

}
