import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ApiService, PeopleParams} from 'app/services/api.service';
import {Content} from 'app/model/Content';
import marked from 'marked';
import {Location} from '@angular/common';
import {AnalyticsService} from 'app/services/analytics.service';
import {ListItem} from '../../model/ListItem';
import {ActionTypeId, ContentTypeId, OptionsService, RoleTypeId} from '../../services/options.service';
import {Subscription} from 'rxjs/Subscription';
import {MediaChange, ObservableMedia} from '@angular/flex-layout';
import {LayoutService} from '../../services/layout.service';
import {AppComponentService} from '../../app.component.service';
import {GuideCategory} from '../../model/GuideCategory';


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
  categories: any[] = [];

  constructor(private route: ActivatedRoute, private apiService: ApiService, private media: ObservableMedia,
              private location: Location, private analyticsService: AnalyticsService, private layoutService: LayoutService,
              private appComponentService: AppComponentService, private optionsService: OptionsService) {

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
    return this.content.actionType && this.content.actionType.id === ActionTypeId.Integrated;
  }

  trackAction() {
    this.analyticsService.trackActionExternal('Content', this.content.name, this.content.action);
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const id = params['contentId'];

      this.apiService.getContent(id).subscribe(
        content => {
          const url = this.location.path();
          const name = content.name;
          this.content = content;

          this.appComponentService.setTitle(name);

          if (!this.isGuide()) {
            this.analyticsService.trackContent(name, url);

            this.apiService.getSimilarContentItems(id).subscribe(
              contentItems => {
                this.similarContentItems = contentItems;
              }
            );

            const peopleParams = new PeopleParams();
            peopleParams.setContentItems([id]);
            peopleParams.setRoleTypes([RoleTypeId.UserSupport]);

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
