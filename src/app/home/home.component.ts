import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {SharedDataService} from "../app.sharedData.service";


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private sharedDataService: SharedDataService) {

  }

  ngOnInit() {
    this.sharedDataService.setTitle('Home', true);
  }


}
