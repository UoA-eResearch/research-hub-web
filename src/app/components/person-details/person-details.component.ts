import { Component, OnInit } from '@angular/core';
import {ApiService, ContentItemsSearchParams} from 'app/app.api.service';
import {ActivatedRoute} from '@angular/router';
import {Person} from 'app/model/Person';
import { Location } from '@angular/common';
import {Content} from 'app/model/Content';
import {AnalyticsService} from 'app/app.analytics.service';


@Component({
  selector: 'app-person-details',
  templateUrl: './person-details.component.html',
  styleUrls: ['./person-details.component.scss']
})
export class PersonDetailsComponent implements OnInit {

  person: Person;
  supportedContent: Array<Content>;

  constructor(private route: ActivatedRoute, private apiService: ApiService,
              private location: Location, private analyticsService: AnalyticsService) {

  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const id = params['personId'];

      this.apiService.getPerson(id).subscribe(
        person => {
          const url = this.location.path();
          const title = person.getTitle();

          this.analyticsService.trackPerson(title, url);
          this.person = person;
        }
      );

      const searchParams = new ContentItemsSearchParams();
      searchParams.setPeople([id]);
      searchParams.setRoleTypes([3]);
      this.apiService.getContentItems(searchParams).subscribe(contentItems => {
        this.supportedContent = contentItems.content;
      });
    });
  }
}
