import {Component, OnInit} from '@angular/core';
import {MenuItem, MenuItemType, MenuService} from "../menu.service";
import {ActivatedRoute} from "@angular/router";
import {ApiService, ContentItemsSearchParams, PeopleSearchParams, SearchParams} from "../app.api.service";
import {ProgressBarService} from "../app.progress-bar.service";
import {SearchBarService} from "../search-bar/search-bar.service";
import {AnalyticsService} from "../app.analytics.service";
import { Location } from '@angular/common';


@Component({
  selector: 'app-browse-results',
  templateUrl: './browse-results.component.html',
  styleUrls: ['./browse-results.component.scss']
})
export class BrowseResultsComponent implements OnInit {

  private results = [];
  title = '';
  description = '';
  imageUrl = '';

  constructor(private menuService: MenuService, private route: ActivatedRoute, private apiService: ApiService,
              private progressBarService: ProgressBarService, private searchBarService: SearchBarService,
              private analyticsService: AnalyticsService, private location: Location) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const categoryId = MenuService.getMenuItemId([params['contentTypeId'], params['subcategoryId']]);
      const menuItem = this.menuService.getMenuItem(categoryId);

      if (menuItem.isLeaf()) {
        this.searchBarService.setCategory(menuItem.id); // When navigating within menu item, set search category to that item
        this.title = menuItem.name;
        this.description = menuItem.description;
        this.imageUrl = this.apiService.getAssetUrl(menuItem.image);

        this.analyticsService.trackPageView(this.location.path(), this.title);

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
    this.apiService.getPeople(new PeopleSearchParams()).subscribe(
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
