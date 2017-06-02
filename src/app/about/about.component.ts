import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {SharedDataService} from "../app.sharedData.service";

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  constructor(private sharedDataService: SharedDataService) {

  }

  ngOnInit() {
    this.sharedDataService.setTitle("About", false);
  }

}
