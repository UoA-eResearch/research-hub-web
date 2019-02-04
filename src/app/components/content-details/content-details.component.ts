import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ResearchHubApiService, PeopleParams} from 'app/services/research-hub-api.service';
import {Content} from 'app/model/Content';
import {Location} from '@angular/common';
import {AnalyticsService} from 'app/services/analytics.service';
import {ListItem} from '../../model/ListItem';
import {ActionTypeId, ContentTypeId, RoleTypeId, OptionsService} from '../../services/options.service';
import {Subscription, Observable, of} from 'rxjs';
import {MediaChange, MediaObserver } from '@angular/flex-layout';
import {LayoutService} from '../../services/layout.service';
import {AppComponentService} from '../../app.component.service';

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

  readonly CONTENT_TYPE_ID_GUIDE: ContentTypeId = ContentTypeId.Guide; // Used to provide a link to all guides in guide breadcrumbs

  constructor(private route: ActivatedRoute, private apiService: ResearchHubApiService, private media: MediaObserver,
              private location: Location, private analyticsService: AnalyticsService, private layoutService: LayoutService,
              private appComponentService: AppComponentService, private optionsService: OptionsService) {
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

          console.log(content);
          content['researchPhases'].map(researchPhase => 
            researchPhase.className = this.optionsService.researchActivityOptions
              .find((researchActivityOption: any) => researchPhase.name === researchActivityOption.name).className
          );

          console.log(content);

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

            this.mediaSub = this.media.media$.subscribe((change: MediaChange) => {
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
