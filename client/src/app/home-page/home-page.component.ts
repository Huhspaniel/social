import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from '../api.service';
import { prepend } from 'ramda';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})

export class HomePageComponent implements OnInit {

  posts: Array<any> = [];
  scores: Array<number> = [];
  userVotes: Array<number> = [];
  constructor(private api: ApiService) { }

  @Input() user: {
    username: string,
    id: number
  };
  @Input() loggedIn: boolean;
  @Input() modalState: string;
  @Input() setModal: Function;

  getScore = post => post.votes.reduce((score, { val }) => score += val, 0);
  getUserVote = post => {
    for (let i = 0; i < post.votes.length; i++) {
      if (post.votes[i].user_id === this.user.id) {
        return post.votes[i].val;
      }
    }
    return 0;
  }

  async refreshPosts() {
    try {
      this.posts = await this.api.get('posts');
      this.scores = this.posts.map(this.getScore);
      this.userVotes = this.posts.map(this.getUserVote);
    } catch (err) {
      console.error(err);
    }
  }

  handleVote(postIndex: number, val: number) {
    if (!this.loggedIn) {
      return this.setModal('login');
    }
    if (this.userVotes[postIndex] === val) {
      this.scores[postIndex] -= val;
      this.userVotes[postIndex] = val = 0;
    } else {
      this.scores[postIndex] += val - this.userVotes[postIndex];
      this.userVotes[postIndex] = val;
    }
    this.api.post('votes', {
      post_id: this.posts[postIndex].id, val
    }).then(data => {
      if (data[0].val !== val) {
        this.userVotes[postIndex] = data[0].val;
        this.scores[postIndex] -= val - data[0].val;
      }
    })
  }

  handleSubmit(e) {
    e.preventDefault();
    const body = Array.from(e.target).reduce((acc, { name: key, value }) => {
      if (key) {
        acc[key] = value;
      }
      return acc;
    }, {});
    Array.from(e.target).forEach(input => {
      if (input['type'] !== 'submit') {
        input['value'] = '';
      }
    });

    const post = {
      title: body['title'],
      content: body['content'],
      user: this.user
    }
    this.posts = prepend(post, this.posts);
    this.scores = prepend(0, this.scores);
    this.userVotes = prepend(0, this.userVotes);
    this.api.post('posts', body)
      .then(_post => {
        Object.assign(post, _post);
      })
      .catch(err => console.error(err));
  }

  ngOnInit() {
    this.refreshPosts();
  }

  ngOnChanges(changes) {
    if (changes.loggedIn) {
      this.userVotes = this.loggedIn ? this.posts.map(this.getUserVote) : [];
    }
  }

}
