import {Component, AfterViewInit} from "@angular/core";
import {OnInit} from "@angular/core";
import {SearchService} from "../app.search.service";
import {DrupalService} from "../app.drupal.service";
import {Observable} from "rxjs/Rx";

@Component({
    templateUrl: './education.component.html'
})
export class EducationComponent implements OnInit, AfterViewInit {
  educations: Observable<Array<string>>;

  constructor(private searchService:SearchService, private drupalService: DrupalService) {

  }

  ngOnInit() {
    this.educations = this.drupalService.contentsearch('education', this.searchService.searchChange);
  }

  ngAfterViewInit()
  {
    window.scrollTo(0,0);
    this.searchService.findAll();
  }

  getAbstract(text) {
    var maxWords = 10;
    return text.split(" ").splice(0, maxWords).join(" ") + "...";
  }
}
