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
        // Remove 'all' category when root category is requested
        let start = 0;
        if (categoryId === '/') {
          start = 1;
        }

        this.categories = category.categories.slice(start);
      } else {
        this.categories = [];
      }
    });
  }
}
