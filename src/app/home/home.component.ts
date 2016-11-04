import {Component, AfterViewInit} from "@angular/core";
import {OnInit} from "@angular/core";
import {SearchService} from "../app.search.service";
import {DrupalService} from "../app.drupal.service";
import {Observable} from "rxjs/Rx";
import {Http, Response, URLSearchParams, Headers} from "@angular/http";

@Component({
    templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit, AfterViewInit  {
    products:any;
    term:any;
constructor(private http:Http, private searchService:SearchService, private drupalService: DrupalService) 
{       var dosearch = new URLSearchParams();
        
        
        if (this.term != undefined && this.term.trim() != "") {
            dosearch.set('search_string', this.term);
        }
        console.log(dosearch);
        
        //this.products = this.drupalService.search('', this.searchService.searchChange);
        //console.log(this.products);
  
        let doheaders = new Headers();
        doheaders.set('Accept', 'application/json');    
        console.log("in home init");
        

        this.http.get(this.drupalService.thisUrl + "?limit=10000&fields=all", {search:dosearch, headers:doheaders})
        .map(res => res.json())
        .subscribe(
        data => this.products = data,
        err => console.log(err),
        () => console.log('Completed', this.products));   
  }

  ngOnInit() {
      this.products = this.drupalService.search(this.searchService.searchChange);
      console.log(this.products);
  }

  ngAfterViewInit()
  {
    this.searchService.findAll();
  }
      
  //ngOnInit() {
   // this.searchSubscription = this.searchService.searchChange.subscribe((value) => {
  //    console.log('Search value: ' + value);
  //  });

  //  $(document).ready(function(){
  //    $('.parallax').parallax();
  //  });
  //}

  ngOnDestroy()
  {
    console.log('destroy');
 //   this.searchSubscription.unsubscribe();
  }

}