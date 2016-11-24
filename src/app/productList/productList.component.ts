import {Component, ViewChild, AfterViewInit, OnInit} from "@angular/core";
import {SearchService} from "../app.search.service";
import {DrupalService} from "../app.drupal.service";
import {Router, ActivatedRoute} from "@angular/router";
import {Observable} from "rxjs/Rx";

@Component({
  templateUrl: './productList.component.html'
})
export class ProductListComponent implements OnInit, AfterViewInit {
  @ViewChild('productList') productList;
  routeParamsSub: any;
  productWidth: number = 180;
  products:Observable<Array<string>>;

  constructor(private route: ActivatedRoute, private searchService:SearchService, private drupalService:DrupalService) {

  }

  ngOnInit() {
    this.products = this.drupalService.productSearch(this.searchService.searchChange, 0);

    this.routeParamsSub = this.route.params.subscribe(params => {
      let productType = params['type'];
      let serviceTypeId = params['serviceTypeId'];
      console.log(productType, "init!");

      let subcategories = {};
      subcategories["field_category"] = serviceTypeId;
      
      this.searchService.updateSearchParameters(productType, subcategories, true);
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
  }
}
