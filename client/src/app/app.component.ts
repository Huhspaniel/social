import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor (private http: HttpClient) {}

  title = 'app';
  loggedIn = false;
  username: string = null;
  userId: number = null;
  login(data) {
    this.loggedIn = true;
    this.username = data.username;
    this.userId = data.id;
    sessionStorage.setItem('token', data.token);
  }
  sendLogin(token: string) {
    this.http.post('/api/login', {}, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }).subscribe(
      data => {
        this.login(data);
      },
      err => {
        console.error(err);
      }
    )
  }
  ngOnInit() {
    const token = sessionStorage.getItem('token');
    if (token) {
      this.sendLogin(token);
    }
  }
}
