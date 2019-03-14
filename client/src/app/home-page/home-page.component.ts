import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

const parsePosts = posts => posts.map(post => {
  const score = post.votes.reduce((sum, { val }) => sum + val, 0);
  post.score = score;
  return post;
})

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})

export class HomePageComponent implements OnInit {

  feed: Array<any>;
  constructor(private api: ApiService) { }

  async refreshFeed() {
    try {
      const posts = await this.api.get('posts');
      console.log(posts);
      this.feed = parsePosts(posts);
    } catch (err) {
      console.error(err);
    }
  }

  ngOnInit() {
    this.refreshFeed();
  }

}
