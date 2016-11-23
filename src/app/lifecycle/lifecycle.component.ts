import {Component, AfterViewInit, OnInit, ViewChild} from "@angular/core";
import {SearchService} from "../app.search.service";
import {Observable} from "rxjs/Rx";
import {DrupalService} from "../app.drupal.service";
import {Router, ActivatedRoute} from "@angular/router";

@Component({
  templateUrl: './lifecycle.component.html'
})
export class LifecycleComponent implements AfterViewInit {
  @ViewChild('productList') productList;
  routeParamsSub: any;
  productWidth: number = 180;
  products:Observable<Array<string>>;

  constructor(private route: ActivatedRoute, private searchService:SearchService, private drupalService:DrupalService) {

  }

  ngOnInit() {
    this.routeParamsSub = this.route.params.subscribe(params => {
      let lifeCycleId = params['id'];
      this.products = this.drupalService.getProducts({taxonomyId: lifeCycleId});
    });
  }

  ngAfterViewInit() {
    window.scrollTo(0, 0);
    // this.searchService.findAll();
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
