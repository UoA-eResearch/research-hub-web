import {Component, OnInit} from '@angular/core';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  coverImageNum: number;

  constructor() {

  }

  ngOnInit() {
    this.coverImageNum = Math.floor((Math.random() * 3) + 1); // Generate a random number between 1 and 3 and use it to get a random cover image
  }
}
