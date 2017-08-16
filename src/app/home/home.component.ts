import {Component, OnInit} from '@angular/core';
import {ApiService} from "../app.api.service";


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  coverImageUrl: string;
  coverImages = ['20151005_Science Detail_001_1680x220_BW.jpg',
    '483_Pacific_28Sep10_1680x220_BW.jpg',
    '20130930_UoA_Details_225_1680x220_BW.jpg'];

  constructor(private apiService: ApiService) {

  }

  ngOnInit() {
    const coverImageIndex = Math.floor(Math.random() * 3); // Generate a random number between 1 and 3 and
    // use it to get a random cover image
    this.coverImageUrl = this.apiService.getAssetUrl('page-elements/' + this.coverImages[coverImageIndex]);
  }
}
