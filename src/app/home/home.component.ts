import {Component, OnInit} from '@angular/core';
import {ApiService} from "../app.api.service";
import {AnalyticsService} from "../app.analytics.service";
import { Location } from '@angular/common';
import {MenuService} from "../menu.service";


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  feedbackUrl = 'https://docs.google.com/forms/d/1snpoqG3sbBPAps4QKK4TpbYxR3CSDOKVpKdc8lAKMjY';
  userstudyUrl = 'https://docs.google.com/forms/d/1FqBQXq5cp9Xk_bXqvqOmib9vl47TnXwco1vC9wXBav0';

  coverImageUrl: string;
  coverImages = ['20151005_Science Detail_001_1680x220_BW.jpg',
    '483_Pacific_28Sep10_1680x220_BW.jpg',
    '20130930_UoA_Details_225_1680x220_BW.jpg'];

  categories = [];

  constructor(private navigationService: MenuService, private apiService: ApiService, private analyticsService: AnalyticsService, private location: Location) {
    this.categories = navigationService.getMenuItem('/').menuItems;
  }

  ngOnInit() {
    this.analyticsService.trackPageView(this.location.path(), 'Home');

    const coverImageIndex = Math.floor(Math.random() * 3); // Generate a random number between 1 and 3 and
    // use it to get a random cover image
    this.coverImageUrl = this.apiService.getAssetUrl('page-elements/' + this.coverImages[coverImageIndex]);
  }
}
