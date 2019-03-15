import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { ApiService } from './api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor (private http: HttpClient, private api: ApiService) {}

  title = 'app';
  user: {
    username: string,
    id: number
  } | {} = {};
  loggedIn: boolean = false;
  modalState: string = 'hidden';

  loginState = ({ username, id, token }): void => {
    this.loggedIn = true;
    this.user = { username, id }
    sessionStorage.setItem('token', token);
  }
  logoutState = (): void => {
    this.loggedIn = false;
    this.user = null;
    sessionStorage.clear();
  }
  login = (auth): Promise<any> => {
    return this.api.post('login', auth)
      .then(this.loginState);
  }
  logout = this.logoutState;

  signup = (data): Promise<any> => {
    return this.api.post('users', data)
      .then(() => this.login(data))
      .then(this.loginState)
  }

  setModal = (status: string): void => {
    this.modalState = status;
  }


  ngOnInit() {
    const token = sessionStorage.getItem('token');
    if (token) {
      this.login({ token })
        .catch(err => console.error(err));
    }
  }
}
