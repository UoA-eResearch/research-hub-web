import {Component, OnInit} from '@angular/core';
import {ApiService, ContentItemsParams} from 'app/services/api.service';
import {ActivatedRoute} from '@angular/router';
import {Person} from 'app/model/Person';
import {Location} from '@angular/common';
import {AnalyticsService} from 'app/services/analytics.service';
import {ListItem} from '../../model/ListItem';


@Component({
  selector: 'app-person-details',
  templateUrl: './person-details.component.html',
  styleUrls: ['./person-details.component.scss']
})
export class PersonDetailsComponent implements OnInit {

  person: Person;
  supportedContent: ListItem[];

  constructor(private route: ActivatedRoute, private apiService: ApiService,
              private location: Location, private analyticsService: AnalyticsService) {

  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const id = params['personId'];

      this.apiService.getPerson(id).subscribe(
        person => {
          const url = this.location.path();
          const title = person.title;

          this.analyticsService.trackPerson(title, url);
          this.person = person;
        }
      );

      const contentItemsParams = new ContentItemsParams();
      contentItemsParams.setPeople([id]);
      contentItemsParams.setRoleTypes([3]);
      this.apiService.getContentItems(contentItemsParams).subscribe(contentItems => {
        this.supportedContent = contentItems.content;
      });
    });
  }
}
