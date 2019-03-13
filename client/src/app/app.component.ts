import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
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
}
