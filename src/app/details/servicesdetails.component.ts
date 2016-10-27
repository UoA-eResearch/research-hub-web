import {Component, AfterViewInit} from "@angular/core";
import {OnInit} from "@angular/core";
import {DrupalService} from "../app.drupal.service";
import {Observable} from "rxjs/Rx";
import {SearchService} from "../app.search.service";
import { ActivatedRoute } from '@angular/router';

@Component({
    templateUrl: './servicesdetails.component.html'
})
export class ServicesdetailsComponent implements OnInit, AfterViewInit {
    id: string;
    details: Observable<Array<string>>;
      
  constructor(private searchService:SearchService, private drupalService: DrupalService, private route: ActivatedRoute) {
       
  }

  ngOnInit() {
        console.log("in services details init");
        this.id = this.route.snapshot.params['id'];
        console.log(this.id);
        this.details = this.drupalService.contentdetailsearch(this.id, this.searchService.searchChange);
        console.log(this.details);
  }
        ngAfterViewInit()
  {
  //  this.searchService.findAll();
  }
}