import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})

export class HomePageComponent implements OnInit {

  posts: Array<any>;
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

  async refreshposts() {
    try {
      const posts = await this.api.get('posts');
      console.log(posts);
      this.posts = this.parsePosts(posts);
    } catch (err) {
      console.error(err);
    }
  }

  vote(postIndex: number, val: number) {
  }
  handleVote(postIndex: number, val: number) {
    const post = this.posts[postIndex];
    if (this.posts[postIndex].userVote === val) {
      post.score -= val;
      post.userVote = val = 0;
    } else {
      post.score += val - post.userVote;
      post.userVote = val;
    }
    this.api.post('votes', {
      post_id: this.posts[postIndex].id, val
    }).then(data => {
      if (data[0].val !== val) {
        post.userVote = data[0].val;
        post.score -= val - data[0].val;
      }
    })
  }

  ngOnInit() {
    this.refreshposts();
  }

}
