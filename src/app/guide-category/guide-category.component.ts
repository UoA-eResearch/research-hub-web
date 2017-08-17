import { Component, OnInit } from '@angular/core';
import {GuideCategory} from "../model/GuideCategory";
import {ActivatedRoute} from "@angular/router";
import {ApiService} from "../app.api.service";

@Component({
  selector: 'app-guide-category',
  templateUrl: './guide-category.component.html',
  styleUrls: ['./guide-category.component.scss']
})
export class GuideCategoryComponent implements OnInit {

  guideCategory: GuideCategory;

  constructor(private route: ActivatedRoute, private apiService: ApiService) {

  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const id = params['id'];

      this.apiService.getGuideCategory(id).subscribe(
        guideCategory => {
          console.log('guideCategory', guideCategory);
          this.guideCategory = guideCategory;
        }
      );
    });
  }

}
