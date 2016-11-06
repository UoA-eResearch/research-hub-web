import {Component, AfterViewInit} from "@angular/core";
import {OnInit} from "@angular/core";
import {SearchService} from "../app.search.service";
import {Observable} from "rxjs/Rx";
import {DrupalService} from "../app.drupal.service";

@Component({
  //selector:'hello',
  templateUrl: './services.component.html'
})
export class ServicesComponent implements OnInit, AfterViewInit {
  services: Observable<Array<string>>;    
  constructor(private searchService:SearchService, private drupalService: DrupalService) {
  
  }
      
  ngOnInit() {
      this.services = this.drupalService.contentsearch('service', this.searchService.searchChange);
      console.log(this.services);
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