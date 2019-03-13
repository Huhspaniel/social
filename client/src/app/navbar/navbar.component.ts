import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})

export class NavbarComponent implements OnInit {
  modalStatus = null;
  showModal(selectedForm) {
    this.modalStatus = selectedForm;
  }
  hideModal(e) {
    if (e.target.tagName === 'APP-LOGIN-MODAL') {
      this.modalStatus = null;
    }
  }

  constructor() { }

  ngOnInit() {
  }

}
