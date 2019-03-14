import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})

export class HomePageComponent implements OnInit {

  feed: Array<any>;
  appState: any;
  constructor(private api: ApiService) { }

  parsePosts = posts => posts.map(post => {
    const data = post.votes.reduce((data, { val, user_id }) => {
      data.score += val;
      if (user_id === this.appState.user.id) data.userVote = val;
      return data;
    }, { score: 0, userVote: 0 });
    post.score = data.score;
    post.userVote = data.userVote;
    console.log(this.appState);
    return post;
  })

  async refreshFeed() {
    try {
      const posts = await this.api.get('posts');
      console.log(posts);
      this.feed = this.parsePosts(posts);
    } catch (err) {
      console.error(err);
    }
  }

  ngOnInit() {
    this.refreshFeed();
  }

}
