import {Component, AfterViewInit} from "@angular/core";
import {OnInit} from "@angular/core";
import {SearchService} from "../app.search.service";
import {DrupalService} from "../app.drupal.service";
import {Observable} from "rxjs/Rx";
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'servicesdetails',
    templateUrl: './details.component.html'
})
export class ServicesdetailsComponent implements OnInit, AfterViewInit {
    id: number;
    private sub: any;
    details: Observable<Array<string>>;
      
  constructor(private searchService:SearchService, private drupalService: DrupalService, private route: ActivatedRoute) {

  }

  ngOnInit() {
        this.sub = this.route.params.subscribe(params => {this.id = +params['id']});
        console.log(this.sub);
        console.log(this.id);
        this.details = this.drupalService.detailsearch(this.sub, this.searchService.searchChange);
  }

  ngOnDestroy() {
         this.sub.unsubscribe();
  }
  ngAfterViewInit()
  {
    this.searchService.findAll();
  }
}