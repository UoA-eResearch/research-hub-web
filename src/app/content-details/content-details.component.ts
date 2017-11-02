import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ApiService, PeopleSearchParams} from "../app.api.service";
import {Content} from "../model/Content";
import marked from 'marked';
import { Location } from '@angular/common';
import {Person} from "../model/Person";
import {AnalyticsService} from "../app.analytics.service";
import {ContentTypeIds} from "../menu.service";


@Component({
  selector: 'app-content-details',
  templateUrl: './content-details.component.html',
  styleUrls: ['./content-details.component.scss']
})
export class ContentDetailsComponent implements OnInit {

  content: Content;
  similarContentItems: Array<Content>;
  userSupport: Array<Person>;
  isKnowledgeArticle = false;

  constructor(private route: ActivatedRoute, private apiService: ApiService,
              private location: Location, private analyticsService: AnalyticsService, private router: Router) {

    // Configure marked
    marked.setOptions({
      renderer: new marked.Renderer(),
      gfm: true,
      tables: true,
      breaks: false,
      pedantic: false,
      sanitize: true,
      smartLists: true,
      smartypants: false
    });
  }

  launchService(content) {
    if (content.actionType['id'] === 1) {
      this.router.navigate(['/' + content.action]);
    }
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const id = params['contentId'];

      this.apiService.getContentItem(id).subscribe(
        content => {
          const url = this.location.path();
          const name = content.name;

          this.analyticsService.trackContent(name, url);
          this.content = content;

          if (this.content.contentTypes !== undefined) {
            this.isKnowledgeArticle = this.content.contentTypes.filter(contentType => {
              return contentType.id === ContentTypeIds.KnowledgeArticle;
            }).length > 0;
          }
        }
      );

      this.apiService.getSimilarContentItems(id).subscribe(
        contentItems => {
          this.similarContentItems = contentItems;
        }
      );

      const searchParams = new PeopleSearchParams();
      searchParams.setContentItems([id]);
      searchParams.setRoleTypes([3]);

      this.apiService.getPeople(searchParams).subscribe(userSupport => {
        this.userSupport = userSupport.content;
      });
    });
  }
}
