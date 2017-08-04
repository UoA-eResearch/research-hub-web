import {Component, OnInit} from "@angular/core";
import {CategoryType, NavigationService} from "../navigation.service";
import {ActivatedRoute} from "@angular/router";
import {ApiService, ContentItemsSearchParams, SearchParams} from "../app.api.service";
import {Person} from "../model/Person";
import {getResultsListItems} from "../model/ResultsListItemInterface";
import {Content} from "../model/Content";
import {ProgressBarService} from "../app.progress-bar.service";

@Component({
  selector: 'app-browse',
  templateUrl: './browse.component.html',
  styleUrls: ['./browse.component.scss']
})
export class BrowseComponent implements OnInit {

  private categories = [];
  private results = [];

  constructor(private navigation: NavigationService, private route: ActivatedRoute, private apiService: ApiService,
              private progressBarService: ProgressBarService) {

  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const categoryId = NavigationService.getCategoryId([params['categoryId'], params['subcategoryId']]);
      const category = this.navigation.getCategory(categoryId);

      if (!category.isLeaf()) {
        this.progressBarService.setHidden();

        // Remove 'all' category when root category is requested
        let start = 0;
        if (categoryId === '/') {
          start = 1;
        }

        this.results = [];
        this.categories = category.categories.slice(start);
      } else {
        this.categories = [];
        this.progressBarService.setVisible();

        if (category.type === CategoryType.Person) {
          this.apiService.getPeople(new SearchParams()).subscribe(
            page => {
              this.progressBarService.setHidden();
              this.results = getResultsListItems(Person.fromObjects(page.content));

              console.log('Page: ', page.content);
              console.log('people: ', this.results);
            }
          );
        } else {
          const searchParams = new ContentItemsSearchParams();

          if (category.type === CategoryType.Category) {
            searchParams.setContentTypes([category.categoryId]);
          } else if (category.type === CategoryType.Subcategory) {
            searchParams.setContentTypes([category.parent.categoryId]);
            searchParams.setContentSubtypes([category.categoryId]);
          }

          this.apiService.getContentItems(searchParams).subscribe(
            page => {
              this.progressBarService.setHidden();
              this.results = getResultsListItems(Content.fromObjects(page.content));

              console.log('Page: ', page.content);
              console.log('content', this.results);
            }
          );
        }
      }
    });
  }
}
