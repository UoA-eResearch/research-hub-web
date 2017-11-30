import { Component, OnInit } from '@angular/core';
import {GuideCategory} from 'app/model/GuideCategory';
import {ActivatedRoute} from '@angular/router';
import {ApiService} from 'app/services/api.service';
import { Location } from '@angular/common';
import {AnalyticsService} from 'app/services/analytics.service';
import {AppComponentService} from '../../app.component.service';


@Component({
  selector: 'app-guide-category',
  templateUrl: './guide-category.component.html',
  styleUrls: ['./guide-category.component.scss']
})
export class GuideCategoryComponent implements OnInit {

  guideCategory: GuideCategory;

  constructor(private route: ActivatedRoute, private apiService: ApiService, private location: Location,
              private analyticsService: AnalyticsService, private appComponentService: AppComponentService) {

  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const id = params['guideCategoryId'];

      this.apiService.getGuideCategory(id).subscribe(
        guideCategory => {
          const url = this.location.path();
          const name = guideCategory.name;

          this.appComponentService.setTitle(name);

          this.analyticsService.trackGuideCategory(name, url);
          this.guideCategory = guideCategory;
        }
      );
    });
  }
}
