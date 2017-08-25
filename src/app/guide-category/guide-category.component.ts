import { Component, OnInit } from '@angular/core';
import {GuideCategory} from "../model/GuideCategory";
import {ActivatedRoute} from "@angular/router";
import {ApiService} from "../app.api.service";
import { Location } from '@angular/common';
import {BreadcrumbService} from "ng2-breadcrumb/ng2-breadcrumb";


@Component({
  selector: 'app-guide-category',
  templateUrl: './guide-category.component.html',
  styleUrls: ['./guide-category.component.scss']
})
export class GuideCategoryComponent implements OnInit {

  guideCategory: GuideCategory;

  constructor(private route: ActivatedRoute, private apiService: ApiService, private location: Location,
              private breadcrumbService: BreadcrumbService) {

  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const id = params['guideCategoryId'];

      this.apiService.getGuideCategory(id).subscribe(
        guideCategory => {
          this.breadcrumbService.addFriendlyNameForRoute(this.location.path(), guideCategory.name);
          this.guideCategory = guideCategory;
        }
      );
    });
  }
}
