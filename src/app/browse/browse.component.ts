import {Component, OnInit} from "@angular/core";
import {CategoryType, NavigationService} from "../navigation.service";
import {ActivatedRoute} from "@angular/router";
import {ApiService, SearchParams} from "../app.api.service";

@Component({
  selector: 'app-browse',
  templateUrl: './browse.component.html',
  styleUrls: ['./browse.component.scss']
})
export class BrowseComponent implements OnInit {

  private categories = [];
  private results = [];
  private loadingData = true;

  constructor(private navigation: NavigationService, private route: ActivatedRoute, private apiService: ApiService) {

  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const categoryId = NavigationService.getCategoryId([params['categoryId'], params['subcategoryId']]);
      const category = this.navigation.getCategory(categoryId);

      if (!category.isLeaf()) {
        this.loadingData = false;

        // Remove 'all' category when root category is requested
        let start = 0;
        if (categoryId === '/') {
          start = 1;
        }

        this.results = [];
        this.categories = category.categories.slice(start);
      } else {
        this.categories = [];
        this.loadingData = true;
        const searchParams = new SearchParams();

        if (category.type === CategoryType.Category) {
          searchParams.categories.push(category.categoryId);
        } else if (category.type === CategoryType.Subcategory) {
          searchParams.categories.push(category.parent.categoryId);
          searchParams.subcategories.push(category.categoryId);
        }

        this.apiService.getSearchResults(searchParams).subscribe(
          data => {
            this.loadingData = false;
            this.results = data;
          }
        );
      }
    });
  }
}
