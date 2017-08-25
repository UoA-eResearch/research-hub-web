import {Component, OnInit} from '@angular/core';
import {BreadcrumbService} from "ng2-breadcrumb/ng2-breadcrumb";
import {ActivatedRoute} from "@angular/router";
import {ApiService} from "../app.api.service";
import {ProgressBarService} from "../app.progress-bar.service";
import {Content} from "../model/Content";
import marked from 'marked';
import { Location } from '@angular/common';
import {Person} from "../model/Person";


@Component({
  selector: 'app-content-details',
  templateUrl: './content-details.component.html',
  styleUrls: ['./content-details.component.scss']
})
export class ContentDetailsComponent implements OnInit {

  content: Content;
  similarContentItems: Array<Content>;
  userSupport: Array<Person>;

  constructor(private breadcrumbService: BreadcrumbService, private route: ActivatedRoute, private apiService: ApiService,
              private progressBarService: ProgressBarService,  private location: Location) {

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

  onCallToActionClick() {
    window.location.href = this.content.callToAction;
  }

  ngOnInit() {
    this.progressBarService.setVisible();

    this.route.params.subscribe(params => {
      const contentId = params['id'];

      this.apiService.getContentItem(contentId).subscribe(
        content => {
          this.breadcrumbService.addFriendlyNameForRoute(this.location.path(), content.name); // Add friendly name for particular content item
          this.content = content;
          this.progressBarService.setHidden();
        }
      );

      this.apiService.getSimilarContentItems(contentId).subscribe(
        contentItems => {
          this.similarContentItems = contentItems;
          this.progressBarService.setHidden();
        }
      );

      this.apiService.getContentItemUserSupport(contentId).subscribe(userSupport => {
        this.userSupport = userSupport;
      });
    });
  }
}
