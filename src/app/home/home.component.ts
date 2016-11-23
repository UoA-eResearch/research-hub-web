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
        console.log("education", data);
        this.educationalProducts = data;
      }
    );

    $(document).ready(function () {
      $('.parallax').parallax();
    });

    // for (let i = 0; i < this.researchLifeCycle.length; i++) {
    //   let researchLifeCycle = this.researchLifeCycle[i];
    //   this.drupalService.getProducts(researchLifeCycle.id).subscribe(
    //     data => {
    //       researchLifeCycle.products = data;
    //     },
    //     err => console.error(err),
    //     () => console.log('Finished getting lifecycle:', researchLifeCycle.name)
    //   );
    // }
    //
    // for (let i = 0; i < this.serviceTypes.length; i++) {
    //   let serviceTypes = this.serviceTypes[i];
    //   // this.drupalService.getProducts(serviceTypes.id).subscribe(
    //   //   data => {
    //   //     serviceTypes.products = data;
    //   //   },
    //   //   err => console.error(err),
    //   //   () => console.log('Finished getting services:', serviceTypes.name)
    //   // );
    // }
  }

  ngAfterViewInit() {
    window.scrollTo(0, 0);
  }
}
