import {Component, OnInit} from '@angular/core';
import {BreadcrumbService} from "ng2-breadcrumb/ng2-breadcrumb";
import {ActivatedRoute} from "@angular/router";
import {ApiService} from "../app.api.service";
import {ProgressBarService} from "../app.progress-bar.service";
import {Content} from "../model/Content";
import marked from 'marked';



@Component({
  selector: 'app-content-details',
  templateUrl: './content-details.component.html',
  styleUrls: ['./content-details.component.scss']
})
export class ContentDetailsComponent implements OnInit {

  content: Content;
  similarContentItems: Array<Content>;

  constructor(private breadcrumbService: BreadcrumbService, private route: ActivatedRoute, private apiService: ApiService,
              private progressBarService: ProgressBarService) {

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
          console.log('content', content);
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
    });
  }

}
