import { Component, OnInit, HostBinding, Input } from '@angular/core';

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.scss']
})
export class LoginModalComponent implements OnInit {
  @HostBinding('class.hidden') @Input() hidden: boolean;
  @Input() selectedForm: string;
  apiPath = () => `/api/${this.selectedForm === 'signup' ? 'users' : 'login'}`
  toggleModal() {
    if (this.selectedForm === 'login') {
      this.selectedForm = 'signup';
    } else {
      this.selectedForm = 'login';
    }
  }

  constructor() { }

  ngOnInit() {
  }

}
