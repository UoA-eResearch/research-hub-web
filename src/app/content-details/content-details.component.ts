import {Component, OnInit} from '@angular/core';
import {BreadcrumbService} from "ng2-breadcrumb/ng2-breadcrumb";
import {ActivatedRoute} from "@angular/router";
import {ApiService} from "../app.api.service";
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

  constructor(private breadcrumbService: BreadcrumbService, private route: ActivatedRoute, private apiService: ApiService,
              private location: Location, private analyticsService: AnalyticsService) {

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

  ngOnInit() {
    this.route.params.subscribe(params => {
      const id = params['id'];

      this.apiService.getContentItem(id).subscribe(
        content => {
          const url = this.location.path();
          const name = content.name;

          this.analyticsService.trackContent(name, url);
          this.breadcrumbService.addFriendlyNameForRoute(url, name); // Add friendly name for particular content item
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

      this.apiService.getContentItemUserSupport(id).subscribe(userSupport => {
        this.userSupport = userSupport;
      });
    });
  }
}
