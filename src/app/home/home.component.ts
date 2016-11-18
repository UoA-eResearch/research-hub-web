import {Component, OnInit, AfterViewInit, OnDestroy} from "@angular/core";
import {SearchService} from "../app.search.service";
import {Observable} from "rxjs/Rx";
import {DrupalService} from "../app.drupal.service";

@Component({
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  @ViewChild('productList') productList;
  productWidth: number = 250;
  products:any[];
export class HomeComponent implements OnInit, AfterViewInit, OnDestroy {
  products: Observable<Array<string>>;
  private searchSubscription: any;
  count : number = 0;
      
  constructor(private searchService:SearchService, private drupalService: DrupalService) {

  getColClasses() {
    let productsPerRow = this.getMaxProducts();
    let gridWidth = Math.ceil(12 / productsPerRow);
    return "s" + gridWidth + " m" + gridWidth + " l" + gridWidth;
  }

  getMaxProducts()
  {
    let numProducts = this.productList.nativeElement.offsetWidth / this.productWidth;
    return Math.max(Math.min(Math.floor(numProducts), 12), 1);
  }

  dummyImageSrc()
  {
    let rand = 1;

    for(let i = 0; i < 5; i++)
    {
      rand *= Math.random();
    }

    return "http://lorempixel.com/160/160/business?dummy=".concat(rand.toString());
  }

  getAbstract(text) {
    var maxWords = 10;
    return text.split(" ").splice(0, maxWords).join(" ") + "...";
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
