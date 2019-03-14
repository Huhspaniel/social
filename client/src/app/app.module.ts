import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http'

import { AppComponent } from './app.component';
import { HomePageComponent } from './home-page/home-page.component';
import { LoginModalComponent } from './login-modal/login-modal.component';
import { NavbarComponent } from './navbar/navbar.component';

const appRoutes = [{
  path: '',
  component: HomePageComponent
}];

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    LoginModalComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
