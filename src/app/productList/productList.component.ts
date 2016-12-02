import {Component, ViewChild, AfterViewInit, OnInit} from "@angular/core";
import {SearchService} from "../app.search.service";
import {DrupalService} from "../app.drupal.service";
import {ActivatedRoute} from "@angular/router";
import {Observable} from "rxjs/Rx";

@Component({
  templateUrl: './productList.component.html'
})
export class ProductListComponent implements OnInit, AfterViewInit {
  @ViewChild('productList') productList;
  routeParamsSub: any;
  productsSub: any;
  searchSub: any;
  showSpinner: boolean = true;
  showProducts: boolean = false;
  showNoResults: boolean = false;
  productWidth: number = 180;
  products:Observable<Array<string>>;
  timers: any[] = [];

  constructor(private route: ActivatedRoute, private searchService:SearchService, private drupalService:DrupalService) {

  }

  ngOnInit() {
    this.products = this.drupalService.productSearch(this.searchService.searchChange, 0);

    this.productsSub = this.products.subscribe(data => {
      let timerA = setTimeout(() => {
        this.showSpinner = false;
      }, 500);

      let timerB = setTimeout(() => {
        this.showProducts = data.length > 0;
      }, 1000);

      let timerC = setTimeout(() => {
        this.showNoResults = data.length == 0;
      }, 1500);

      this.timers = [timerA, timerB, timerC];
    });

    this.routeParamsSub = this.route.params.subscribe(params => {
      let productType = params['type'];
      let serviceTypeId = params['serviceTypeId'];
      let subcategories = {};
      subcategories["field_category"] = serviceTypeId;
      this.searchService.updateSearchParameters(productType, subcategories, true);
    });

    this.searchSub = this.searchService.searchChange.distinctUntilChanged().subscribe(data => {
        for(let i = 0; i < this.timers.length; i++)
        {
          clearTimeout(this.timers[i]);
        }
        this.timers = [];
        this.showSpinner = true;
        this.showProducts = false;
        this.showNoResults = false;
    });
  }

  ngAfterViewInit() {
    this.searchService.findAll();
    window.scrollTo(0, 0);
  }

  getColClasses() {
    let productsPerRow = Math.min(Math.floor(this.productList.nativeElement.offsetWidth / this.productWidth), 12);
    let gridWidth = Math.ceil(12 / productsPerRow);
    return "s" + gridWidth + " m" + gridWidth + " l" + gridWidth;
  }

  ngOnDestroy() {
    this.routeParamsSub.unsubscribe();
    this.productsSub.unsubscribe();
    this.searchSub.unsubscribe();
  }
}
