import { Component, OnInit, HostBinding, Input, Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.scss']
})

@Injectable()
export class LoginModalComponent implements OnInit {

  constructor(private http: HttpClient) { }

  @HostBinding('class.hidden') @Input() hidden: boolean;
  @Input() selectedForm: string;
  @Output() showModal = new EventEmitter<string>();
  @Output() hideModal = new EventEmitter();

  toggleModal() {
    if (this.selectedForm === 'login') {
      this.showModal.emit('signup');
    } else {
      this.showModal.emit('login');
    }
  }
  closeModal() {
    this.hideModal.emit();
  }

  sendForm(body: object) {
    const path = `/api/${this.selectedForm === 'signup' ? 'users' : 'login'}`;
    return this.http.post(path, JSON.stringify(body), {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
  getApiPath = () => `/api/${this.selectedForm === 'signup' ? 'users' : 'login'}`
  async handleSubmit(e) {
    e.preventDefault();
    type signupBody = {
      email: string,
      username: string,
      firstname: string,
      lastname: string
    }
    const body = Array.from(e.target).reduce((acc: signupBody, { name: key, value }) => {
      if (key) {
        acc[key] = value;
      }
      return acc;
    }, {});
    console.log(body);
    try {
      this.sendForm(body).subscribe();
    } catch (err) {
      console.error(err);
    }
  }

  ngOnInit() {
  }

}
