import {Component, OnInit} from '@angular/core';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  coverImageUrl: string;

  constructor() {

  }

  ngOnInit() {
    const coverImageNum = Math.floor((Math.random() * 3) + 1); // Generate a random number between 1 and 3 and use it to get a random cover image
    this.coverImageUrl = 'assets/cover-' + coverImageNum + '.jpg';
  }
}
