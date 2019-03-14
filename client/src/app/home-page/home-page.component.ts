import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

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
      this.feed = await this.api.get('posts');
      console.log(this.feed);
    } catch (err) {
      console.error(err);
    }
  }

  ngOnInit() {
    this.refreshFeed();
  }

}
