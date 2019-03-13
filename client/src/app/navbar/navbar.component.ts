import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})

export class NavbarComponent implements OnInit {
  modalStatus = null;
  showModal(selectedForm: string) {
    this.modalStatus = selectedForm;
  }
  hideModal() {
    this.modalStatus = null;
  }
  handleClick(e) {
    if (e.target.tagName === 'APP-LOGIN-MODAL') {
      this.hideModal();
    }
  }

  constructor() { }

  ngOnInit() {
  }

}
