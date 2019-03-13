import { Component, OnInit, Input, Injectable, Output, EventEmitter, HostListener } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.scss']
})

@Injectable()
export class LoginModalComponent implements OnInit {

  constructor(private http: HttpClient) { }

  @Output() login = new EventEmitter<object>();
  @Input() modalStatus: string | null;
  @Output() setModalStatus = new EventEmitter<string | null>();
  @HostListener('click', ['$event']) onClick(e) {
    if (e.target.tagName === 'APP-LOGIN-MODAL') {
      this.closeModal();
    }
  };
  toggleModal() {
    if (this.modalStatus === 'login') {
      this.setModalStatus.emit('signup');
    } else {
      this.setModalStatus.emit('login');
    }
  }
  closeModal() {
    this.setModalStatus.emit(null);
  }

  postApi(body: object, resource: string) {
    return this.http.post(`/api/${resource}`, JSON.stringify(body), {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
  send_login(body: object) {
    return this.postApi(body, 'login').subscribe(
      data => {
        this.login.emit(data);
        this.closeModal();
      },
      err => {
        console.error(err);
      }
    );
  }
  send_signup(body: object) {
    return this.postApi(body, 'users').subscribe(
      () => {
        this.send_login(body);
      },
      err => {
        console.error(err);
      }
    );
  }
  getApiPath = () => `/api/${this.modalStatus === 'signup' ? 'users' : 'login'}`
  async handleSubmit(e) {
    e.preventDefault();
    const body = Array.from(e.target).reduce((acc, { name: key, value }) => {
      if (key) {
        acc[key] = value;
      }
      return acc;
    }, {});
    this[`send_${this.modalStatus}`](body);
  }

  ngOnInit() {
  }

}
