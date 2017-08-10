import {Component, OnInit} from "@angular/core";
import {MenuItem, MenuItemType, MenuService} from "../menu.service";
import {ActivatedRoute} from "@angular/router";
import {ApiService, ContentItemsSearchParams, SearchParams} from "../app.api.service";
import {Person} from "../model/Person";
import {Content} from "../model/Content";
import {ProgressBarService} from "../app.progress-bar.service";
import {SearchBarService} from "../search-bar/search-bar.service";

@Component({
  selector: 'app-browse',
  templateUrl: './browse.component.html',
  styleUrls: ['./browse.component.scss']
})
export class BrowseComponent implements OnInit {

  private menuItems = [];
  private results = [];

  constructor(private menuService: MenuService, private route: ActivatedRoute, private apiService: ApiService,
              private progressBarService: ProgressBarService, private searchBarService: SearchBarService) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const categoryId = MenuService.getMenuItemId([params['contentTypeId'], params['subcategoryId']]);
      const menuItem = this.menuService.getMenuItem(categoryId);

      if (!menuItem.isLeaf()) {
        this.progressBarService.setHidden();

        // Remove 'all' category when root category is requested
        let start = 0;
        if (categoryId === '/') {
          start = 1;
          this.searchBarService.setCategory('all');
        }

        this.results = [];
        this.menuItems = menuItem.menuItems.slice(start);
      } else {
        this.menuItems = [];
        this.progressBarService.setVisible();
        this.searchBarService.setCategory(menuItem.id); // When navigating within menu item, set search category to that item

        switch (menuItem.type) {
          case MenuItemType.Content:
            this.loadContent(menuItem);
            break;
          case MenuItemType.Guide:
            break;
          case MenuItemType.Person:
            this.loadPeople();
            break;
          case MenuItemType.Policy:
            this.loadPolicies();
            break;
          default:
            break;
        }
      }
    });
  }

  private loadPolicies() {

    this.apiService.getPolicies(new SearchParams()).subscribe(
      page => {
        this.results = page.content;
      }
    );
  }

  private loadPeople() {
    this.apiService.getPeople(new SearchParams()).subscribe(
      page => {
        this.progressBarService.setHidden();
        this.results = page.content;
      }
    );
  }

  private loadContent(menuItem: MenuItem) {
    const searchParams = new ContentItemsSearchParams();
    searchParams.setContentTypes([menuItem.contentTypeId]);

    this.apiService.getContentItems(searchParams).subscribe(
      page => {
        this.progressBarService.setHidden();
        this.results = page.content;
      }
    );
  }
}
