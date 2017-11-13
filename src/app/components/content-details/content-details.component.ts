import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ApiService, PeopleParams} from 'app/services/api.service';
import {Content} from 'app/model/Content';
import marked from 'marked';
import {Location} from '@angular/common';
import {AnalyticsService} from 'app/services/analytics.service';
import {ListItem} from '../../model/ListItem';
import {ActionTypeId, ContentTypeId} from '../../services/options.service';
import {Subscription} from 'rxjs/Subscription';
import {MediaChange, ObservableMedia} from '@angular/flex-layout';
import {LayoutService} from '../../services/layout.service';


@Component({
  selector: 'app-content-details',
  templateUrl: './content-details.component.html',
  styleUrls: ['./content-details.component.scss']
})
export class ContentDetailsComponent implements OnInit, OnDestroy {

  content: Content;
  similarContentItems: Content[];
  userSupport: ListItem[];
  numCols = 1;
  mediaSub: Subscription;

  // this.analyticsService.trackGo(this.goEventCategory, this.title, this.goHref);

  constructor(private route: ActivatedRoute, private apiService: ApiService, private media: ObservableMedia,
              private location: Location, private analyticsService: AnalyticsService, private layoutService: LayoutService,
              private router: Router) {

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

  isGuide() {
    return this.includesContentType(ContentTypeId.Guide);
  }

  isKnowledgeArticle() {
    return this.includesContentType(ContentTypeId.KnowledgeArticle);
  }

  private includesContentType(contentTypeId: ContentTypeId): boolean {
    return this.content.contentTypes.filter((item) => {
      return item.id === contentTypeId;
    }).length > 0;
  }

  isIntegratedService() {
    return this.content.actionType.id === ActionTypeId.Integrated;
  }
  //
  // Service(content) {
  //   if (content.actionType.id === ActionTypeId.Integrated) {
  //     this.router.navigate(['/' + content.action]);
  //   } else {
  //
  //   }
  // }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const id = params['contentId'];

      this.apiService.getContent(id).subscribe(
        content => {
          const url = this.location.path();
          const name = content.name;
          this.content = content;

          if (!this.isGuide()) {
            this.analyticsService.trackContent(name, url);

            this.apiService.getSimilarContentItems(id).subscribe(
              contentItems => {
                this.similarContentItems = contentItems;
              }
            );

            const peopleParams = new PeopleParams();
            peopleParams.setContentItems([id]);
            peopleParams.setRoleTypes([3]);

            this.apiService.getPeople(peopleParams).subscribe(userSupport => {
              this.userSupport = userSupport.content;
            });
          } else {
            this.analyticsService.trackGuide(name, url);

            this.numCols = this.layoutService.getNumGridCols(this.layoutService.getMQAlias());

            this.mediaSub = this.media.subscribe((change: MediaChange) => {
              this.numCols = this.layoutService.getNumGridCols(change.mqAlias);
            });
          }
        }
      );
    });
  }

  ngOnDestroy() {
    if (this.mediaSub) {
      this.mediaSub.unsubscribe();
    }
  }
}
