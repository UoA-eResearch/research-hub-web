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
  productType: string;
  productWidth: number = 180;
  products:Observable<Array<string>>;

  constructor(private route: ActivatedRoute, private router: Router, private searchService:SearchService, private drupalService:DrupalService) {

  }

  ngOnInit() {
    console.log('init!');
    this.routeParamsSub = this.route.params.subscribe(params => {
      console.log('route params changed!', params);
      this.productType = params['type'];
      this.products = this.drupalService.contentSearch(this.productType, this.searchService.searchChange);
    });
  }

  ngAfterViewInit() {
    console.log('after view init');
    window.scrollTo(0, 0);
    this.searchService.findAll();
  }

  openProductDetails(productId)
  {
    this.router.navigate(['productList', this.productType, 'productDetails', productId]);
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
