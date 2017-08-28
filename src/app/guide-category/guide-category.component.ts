import { Component, OnInit } from '@angular/core';
import {GuideCategory} from "../model/GuideCategory";
import {ActivatedRoute} from "@angular/router";
import {ApiService} from "../app.api.service";
import { Location } from '@angular/common';
import {BreadcrumbService} from "ng2-breadcrumb/ng2-breadcrumb";
import {AnalyticsService} from "../app.analytics.service";


@Component({
  selector: 'app-guide-category',
  templateUrl: './guide-category.component.html',
  styleUrls: ['./guide-category.component.scss']
})
export class GuideCategoryComponent implements OnInit {

  guideCategory: GuideCategory;

  constructor(private route: ActivatedRoute, private apiService: ApiService, private location: Location,
              private breadcrumbService: BreadcrumbService, private analyticsService: AnalyticsService) {

  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const id = params['guideCategoryId'];

      this.apiService.getGuideCategory(id).subscribe(
        guideCategory => {
          const url = this.location.path();
          const name = guideCategory.name;

          this.analyticsService.trackGuideCategory(name, url);
          this.breadcrumbService.addFriendlyNameForRoute(url, name);
          this.guideCategory = guideCategory;
        }
      );
    });
  }
}
