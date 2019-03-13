import { Component, OnInit, HostBinding, Input, Injectable, Output, EventEmitter, HostListener } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.scss']
})

@Injectable()
export class LoginModalComponent implements OnInit {

  constructor(private http: HttpClient) { }

  @Input() modalStatus: string|null;
  @Output() setModalStatus = new EventEmitter<string|null>();
  @HostListener('click', ['$event']) onClick(e) {
    if (e.target.tagName === 'APP-LOGIN-MODAL') {
      this.setModalStatus.emit(null);
    }
  };
  toggleModal() {
    if (this.modalStatus === 'login') {
      this.setModalStatus.emit('signup');
    } else {
      this.setModalStatus.emit('login');
    }
  }

  sendForm(body: object) {
    const path = `/api/${this.modalStatus === 'signup' ? 'users' : 'login'}`;
    return this.http.post(path, JSON.stringify(body), {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
  getApiPath = () => `/api/${this.modalStatus === 'signup' ? 'users' : 'login'}`
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
