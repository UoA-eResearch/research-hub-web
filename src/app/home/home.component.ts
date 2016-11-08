import {Component, OnInit, AfterViewInit, OnDestroy} from "@angular/core";
import {SearchService} from "../app.search.service";
import {Observable} from "rxjs/Rx";
import {DrupalService} from "../app.drupal.service";

@Component({
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit, OnDestroy {
  products: Observable<Array<string>>;
  private searchSubscription: any;
  count : number = 0;
      
  constructor(private searchService:SearchService, private drupalService: DrupalService) {

  }

  ngOnInit() {
    this.searchSubscription = this.searchService.searchChange.subscribe((value) => {
      console.log('Search value: ' + value);
    });

    $(document).ready(function(){
      $('.parallax').parallax();
    });

    this.products = this.drupalService.frontsearch('', this.searchService.searchChange);
  }
  IncCounter()
  {
      this.count=this.count+1;
  }
  getCounter()
  {
      return this.count;
  }
  resetCounter()
  {
      this.count=0;
  }
  ngOnDestroy()
  {
    console.log('destroy');
    this.searchSubscription.unsubscribe();
  }

  ngAfterViewInit()
  {
    window.scrollTo(0,0);
    this.searchService.findAll();
  }
}