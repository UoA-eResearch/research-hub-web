import {Component, OnInit, ViewChild, AfterViewInit} from "@angular/core";
import {DrupalService} from "../app.drupal.service";
import {Router, ActivatedRoute} from "@angular/router";
import {SearchService} from "../app.search.service";
import {Observable} from "rxjs/Rx";
declare var $:any;

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit {
  @ViewChild('productList') productList;
  private productWidth:number = 250;
  private taxonomies = {research_lifecycle: "3", service_type: "2"};
  private lifeCycleTerms:Observable<Array<string>>;
  private serviceTypeTerms:Observable<Array<string>>;
  private educationalProducts = [];
  private allProducts = {};
  private routeParamsSub: any;

  constructor(private drupalService:DrupalService, private router:Router, private searchService:SearchService, private route: ActivatedRoute) {

  }

  navigateToLifecycle(lifeCycle) {
    this.router.navigate(['lifecycle', lifeCycle.id]);
  }

  navigateToServices(serviceTypeId) {
    this.router.navigate(['productList', 'service', serviceTypeId]);
  }

  getColClasses() {
    let productsPerRow = this.productList.nativeElement.offsetWidth / this.productWidth;
    let gridWidth = Math.floor(12 / productsPerRow);
    let smallGridWidth = gridWidth;

    if(Math.floor(productsPerRow) <= 1)
      smallGridWidth = 12;

    return "s" + smallGridWidth + " m" + gridWidth + " l" + gridWidth;
  }

  getMaxProducts() {
    let productsPerRow = this.productList.nativeElement.offsetWidth / this.productWidth;
    let gridWidth = Math.floor(12 / productsPerRow);
    let totalProducts = Math.floor(12 / gridWidth);
    return Math.max(Math.min(totalProducts, 12), 1);
  }

  getProducts(taxonomyId)
  {
    if(!(taxonomyId in this.allProducts))
      return [];

    return this.allProducts[taxonomyId];
  }

  populateProducts(data)
  {
    for (let i = 0; i < data.length; i++) {
      let termId = data[i]["id"];
      this.drupalService.getProducts(undefined, [termId]).subscribe(
        data => {
          this.allProducts[termId] = data;
        }
      );
    }
  }

  ngOnInit() {
    this.routeParamsSub = this.route.params.subscribe(params => {
      this.searchService.updateAllSearchParameters(undefined, {}, true);
    });

    this.lifeCycleTerms = this.drupalService.getTaxonomy(this.taxonomies.research_lifecycle);
    this.serviceTypeTerms = this.drupalService.getTaxonomy(this.taxonomies.service_type);

    this.lifeCycleTerms.subscribe(
      data => {
        this.populateProducts(data);
      }
    );

    this.serviceTypeTerms.subscribe(
      data => {
        this.populateProducts(data);
      }
    );

    this.drupalService.getProducts("education", []).subscribe(
      data => {
        this.educationalProducts = data;
      }
    );

    $(document).ready(function () {
      $('.parallax').parallax();
    });
  }

  ngAfterViewInit() {
    window.scrollTo(0, 0);
  }

  ngOnDestroy() {
    this.routeParamsSub.unsubscribe();
  }
}
