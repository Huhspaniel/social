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
  state: any = {
    user: {},
    loggedIn: false
  }
  setState = (state) => {
    for (const prop in state) {
      this.state[prop] = state[prop];
    }
  }

  loginState = ({ username, id, token }): void => {
    // this.loggedIn = true;
    // this.user = { username, id }
    this.setState({
      loggedIn: true,
      user: { username, id }
    })
    sessionStorage.setItem('token', token);
  }
  logoutState = (): void => {
    // this.loggedIn = false;
    // this.user = null;
    this.setState({
      loggedIn: false,
      user: {}
    })
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

  routerActivate(component) {
    component.appState = this.state;
  }

  ngOnInit() {
    const token = sessionStorage.getItem('token');
    if (token) {
      this.login({ token })
        .catch(err => console.error(err));
    }
  }
}
