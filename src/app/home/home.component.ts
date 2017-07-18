import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {SharedDataService} from '../app.sharedData.service';
import {AnalyticsService} from '../app.analytics.service';
import {Location} from '@angular/common';
import {ApiService} from "../app.api.service";


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  title = 'Home';

  constructor(private sharedDataService: SharedDataService, private location: Location,
        private analyticsService: AnalyticsService, private apiService: ApiService) {

    this.apiService.getCategory('contentType').subscribe(
      data => {
        console.log(data);
      }
    );

    this.apiService.getCategory('contentSubtype').subscribe(
      data => {
        console.log(data);
      }
    );

    this.apiService.getCategory('researchPhase').subscribe(
      data => {
        console.log(data);
      }
    );

    this.apiService.getCategory('roleType').subscribe(
      data => {
        console.log(data);
      }
    );

    this.apiService.getContentItems().subscribe(
      data => {
        console.log(data);
      }
    );

    this.apiService.getContentItem(1).subscribe(
      data => {
        console.log(data);
      }
    );

    this.apiService.getPeople().subscribe(
      data => {
        console.log(data);
      }
    );

    this.apiService.getPerson(1).subscribe(
      data => {
        console.log(data);
      }
    );

    this.apiService.getOrgUnits().subscribe(
      data => {
        console.log(data);
      }
    );

    this.apiService.getOrgUnit(1).subscribe(
      data => {
        console.log(data);
      }
    );
  }

  ngOnInit() {
    this.sharedDataService.setTitle(this.title, true);
    this.analyticsService.trackPageView(this.location.path(), this.title);
  }
}
