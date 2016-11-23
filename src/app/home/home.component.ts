import {Component, OnInit, ViewChild, AfterViewInit} from "@angular/core";
import {DrupalService} from "../app.drupal.service";
import {Router} from "@angular/router";
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

  constructor(private drupalService:DrupalService, private router:Router) {

  }

  navigateToLifecycle(lifeCycle) {
    this.router.navigate(['lifecycle', lifeCycle.id]);
  }

  navigateToServices(serviceTypeId) {
    this.router.navigate(['productList', 'service', serviceTypeId]);
  }

  getColClasses() {
    let productsPerRow = this.getMaxProducts();
    let gridWidth = Math.ceil(12 / productsPerRow);
    return "s" + gridWidth + " m" + gridWidth + " l" + gridWidth;
  }

  getMaxProducts() {
    let numProducts = this.productList.nativeElement.offsetWidth / this.productWidth;
    return Math.max(Math.min(Math.floor(numProducts), 12), 1);
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
      this.drupalService.getProducts({taxonomyId: termId}).subscribe(
        data => {
          this.allProducts[termId] = data;
        }
      );
    }
  }

  ngOnInit() {
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

    this.drupalService.getProducts({type: "education"}).subscribe(
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
}
