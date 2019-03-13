import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})

export class NavbarComponent implements OnInit {
  modalStatus: string|null = null;
  setModalStatus(status: string|null) {
    this.modalStatus = status;
  }

  constructor() { }

  ngOnInit() {
  }

}
