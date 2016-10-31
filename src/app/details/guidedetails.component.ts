import {Component, AfterViewInit} from "@angular/core";
import {OnInit} from "@angular/core";
import {DrupalService} from "../app.drupal.service";
import {Observable} from "rxjs/Rx";
import {SearchService} from "../app.search.service";
import { ActivatedRoute } from '@angular/router';
import {Http, Response, URLSearchParams, Headers} from "@angular/http";

@Component({
    templateUrl: './details.component.html'
})
export class GuidedetailsComponent implements OnInit, AfterViewInit {
    id: string;
    product:any;
  
  constructor(private http:Http, private searchService:SearchService, private drupalService: DrupalService, private route: ActivatedRoute) {
        
  }
private handleError(error: Response){
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
}
  ngOnInit() {
            
        console.log("in guide details init");
        this.id = this.route.snapshot.params['id'];

        this.http.get(this.drupalService.thisUrl + "/" + this.id)
        .map(res => res.json())
        .subscribe(
        data => this.product = data,
        err => console.log(err),
        () => console.log('Completed', this.product));      
  }
  ngAfterViewInit()
  {
    this.searchService.findAll();
  }
}