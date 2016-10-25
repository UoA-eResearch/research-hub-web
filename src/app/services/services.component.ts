import {Component} from "@angular/core";
import {OnInit, OnDestroy} from "@angular/core";
import {SearchService} from "../app.search.service";
import {DrupalService} from "../app.drupal.service";
import {Observable} from "rxjs/Rx";

@Component({
  templateUrl: './services.component.html'
})
export class ServicesComponent implements OnInit {
  services: Observable<Array<string>>;

  constructor(private searchService:SearchService, private drupalService: DrupalService) {
    this.services = this.searchService
      .searchChange
      .debounceTime(400)
      .distinctUntilChanged()
      .switchMap(value => this.drupalService.searchCategory('services', value.searchTerm, value.subcategories));
  }

  ngOnInit() {
    // this.searchService.setSearchValue("a");
  }

  getAbstract(text) {
    var maxWords = 10;
    return text.split(" ").splice(0, maxWords).join(" ") + "...";
  }
}
