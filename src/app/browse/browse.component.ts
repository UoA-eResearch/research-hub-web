import {Component, OnInit} from '@angular/core';
import {NavigationService} from "../navigation.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-results',
  templateUrl: './browse.component.html',
  styleUrls: ['./browse.component.scss']
})
export class BrowseComponent implements OnInit {

  categories = [];

  constructor(private navigation: NavigationService, private route: ActivatedRoute) {

  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const categoryId = NavigationService.getCategoryId([params['categoryId'], params['subcategoryId']]);
      const category = this.navigation.getCategory(categoryId);

      if (!category.isLeaf()) {
        this.categories = category.categories;
      } else {
        this.categories = [];
      }
    });
  }
}
