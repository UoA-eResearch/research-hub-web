import {Component, AfterViewInit} from "@angular/core";
import {OnInit} from "@angular/core";
import {SearchService} from "../app.search.service";
import {Observable} from "rxjs/Rx";
import {DrupalService} from "../app.drupal.service";

@Component({
    templateUrl: './guides.component.html'
})
export class GuidesComponent implements OnInit, AfterViewInit {
  guides: Observable<Array<string>>;

  constructor(private searchService:SearchService, private drupalService: DrupalService) {

  }

  ngOnInit() {
    this.guides = this.drupalService.contentsearch('guide', this.searchService.searchChange);
  }

  ngAfterViewInit()
  {
    this.searchService.findAll();
  }

  getAbstract(text) {
    var maxWords = 10;
    return text.split(" ").splice(0, maxWords).join(" ") + "...";
  }
}
