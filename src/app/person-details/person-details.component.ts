import { Component, OnInit } from '@angular/core';
import {ApiService} from "../app.api.service";
import {ActivatedRoute} from "@angular/router";
import {Person} from "../model/Person";
import { Location } from '@angular/common';
import {BreadcrumbService} from "ng2-breadcrumb/ng2-breadcrumb";
import {Content} from "../model/Content";


@Component({
  selector: 'app-person-details',
  templateUrl: './person-details.component.html',
  styleUrls: ['./person-details.component.scss']
})
export class PersonDetailsComponent implements OnInit {

  person: Person;
  supportedContent: Array<Content>;

  constructor(private route: ActivatedRoute, private apiService: ApiService, private breadcrumbService: BreadcrumbService, private location: Location) {

  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const id = params['id'];

      this.apiService.getPerson(id).subscribe(
        person => {
          this.breadcrumbService.addFriendlyNameForRoute(this.location.path(), person.getTitle());
          this.person = person;
        }
      );

      this.apiService.getPersonUserSupportContent(id).subscribe(supportedContent => {
        this.supportedContent = supportedContent;
      });
    });
  }
}
