import {Component, OnInit, ViewChild, AfterViewInit} from "@angular/core";
import {DrupalService} from "../app.drupal.service";
import {Router} from "@angular/router";
declare var $:any;

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit {
  @ViewChild('productList') productList;
  private productWidth:number = 250;
  private researchLifeCycle = [
    {name: "Plan & Design", id: "11", products: []},
    {name: "Create Collect Capture", id: "12", products: []},
    {name: "Analyse & Interpret", id: "14", products: []},
    {name: "Publish & Report", id: "13", products: []},
    {name: "Discover & Re-use", id: "16", products: []}];

  private serviceTypes = [
    {name: "Research Computing", id: "1", products: []},
    {name: "Research Data", id: "2", products: []},
    {name: "Analysis & Visualisation", id: "4", products: []},
    {name: "Specialised Equipment", id: "19", products: []},
    {name: "Consultation Services", id: "3", products: []},
    {name: "Communication & Publishing", id: "25", products: []}];

  constructor(private drupalService:DrupalService, private router: Router) {

  }

  navigateToLifecycle(lifeCycle)
  {
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

  ngOnInit() {

    $(document).ready(function () {
      $('.parallax').parallax();
    });

    for (let i = 0; i < this.researchLifeCycle.length; i++) {
      let researchLifeCycle = this.researchLifeCycle[i];
      this.drupalService.getProducts(researchLifeCycle.id).subscribe(
        data => {
          researchLifeCycle.products = data;
        },
        err => console.error(err),
        () => console.log('Finished getting lifecycle:', researchLifeCycle.name)
      );
    }

    for (let i = 0; i < this.serviceTypes.length; i++) {
      let serviceTypes = this.serviceTypes[i];
      this.drupalService.getProducts(serviceTypes.id).subscribe(
        data => {
          serviceTypes.products = data;
        },
        err => console.error(err),
        () => console.log('Finished getting services:', serviceTypes.name)
      );
    }
  }

  ngAfterViewInit() {
    window.scrollTo(0, 0);
  }
}
