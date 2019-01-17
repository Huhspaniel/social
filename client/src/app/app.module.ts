import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { PostsPageComponent } from './posts-page/posts-page.component';
import { UsersPageComponent } from './users-page/users-page.component';
import { HomePageComponent } from './home-page/home-page.component';

const appRoutes = [{
  path: 'posts',
  component: PostsPageComponent
}, {
  path: 'users',
  component: UsersPageComponent
}, {
  path: '',
  component: HomePageComponent
}];

@NgModule({
  declarations: [
    AppComponent,
    PostsPageComponent,
    UsersPageComponent,
    HomePageComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
