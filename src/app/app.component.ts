import {Component, OnInit, ChangeDetectorRef, ApplicationRef} from '@angular/core';
import {Router, NavigationEnd} from "@angular/router";
import {SearchService} from "./app.search.service";
import {DrupalService} from "./app.drupal.service";
import {ProductService} from "./app.product.service";
import {Observable} from "rxjs/Rx";
import * as moment from 'moment';
declare var $:any;
import {Location} from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [SearchService, DrupalService, ProductService]
})
export class AppComponent implements OnInit {
  uiChangeSub: any;

  lifeCycle:string = "";
  serviceType:string = "";
  programme:string = "";
  studyLevel:string = "";

  lifeCycleTerms:Observable<Array<string>>;
  serviceTypeTerms:Observable<Array<string>>;
  programmeTerms:Observable<Array<string>>;
  studyLevelTerms:Observable<Array<string>>;

  taxonomies = {research_lifecycle: "3", service_type: "2", programme: "7", study_level: "8"};

  constructor(private router:Router, private searchService:SearchService, private drupalService:DrupalService, private location: Location) {

  }

  getTaxonomies() {
    this.lifeCycleTerms = this.drupalService.getTaxonomy(this.taxonomies.research_lifecycle);
    this.serviceTypeTerms = this.drupalService.getTaxonomy(this.taxonomies.service_type);
    this.programmeTerms = this.drupalService.getTaxonomy(this.taxonomies.programme);
    this.studyLevelTerms = this.drupalService.getTaxonomy(this.taxonomies.study_level);

    //Reset all select boxes when data changed
    Observable.forkJoin(
      this.lifeCycleTerms,
      this.serviceTypeTerms,
      this.programmeTerms,
      this.studyLevelTerms
    )
    .delay(500)
    .subscribe(
      data => {
        $('select').material_select();
      },
      err => console.error(err)
    );
  }

  getSecondaryMenuClass()
  {
    if(this.router.isActive('home', true) || this.router.isActive('showcase', true) || this.router.isActive('policies', true) || this.router.isActive('guides', true))
      return "secondary-menu-bar";
    return "";
  }

  back()
  {
    this.location.back();
  }

  isProductDetailsActive() {
    return this.router.isActive('lifecycle/education/productDetails', false) ||
           this.router.isActive('lifecycle/service/productDetails', false) ||
           this.router.isActive('productList/service/productDetails', false) ||
           this.router.isActive('productList/education/productDetails', false);
  }

  getYear() {
    return moment().year();
  }

  setSearchTerm(term) {
    this.searchService.setSearchTerm(term);
  }

  isHomeActive()
  {
    return this.router.isActive('home', true);
  }

  isLifecycleActive() {
    return this.router.isActive('lifecycle', false) && !this.isProductDetailsActive();
  }

  isServicesActive() {
    return this.router.isActive('productList/service', false) && !this.isProductDetailsActive();
  }

  isEducationActive() {
    return this.router.isActive('productList/education', false) && !this.isProductDetailsActive();
  }

  ngOnDestroy() {
    this.uiChangeSub.unsubscribe();
  }

  //Update dropdowns when route value changes
  ngOnInit() {
    this.uiChangeSub = this.searchService.uiChange.subscribe(data => {
      //Reset search box
      $("#search").val("");
      this.setSearchTerm("");

      let subcategories = data['subcategories'];
      let lifeCycle = subcategories['field_research_lifecycle_stage'];
      let serviceType = subcategories['field_category'];
      let programme = subcategories['field_programme'];
      let studyLevel = subcategories['field_study_level'];

      //Set all to none
      $("select").val("");
      this.lifeCycle = "";
      this.serviceType = "";
      this.programme = "";
      this.studyLevel = "";

      if(lifeCycle) {
        this.lifeCycle = lifeCycle;
        $("#lifeCycleSelect").val(lifeCycle);
      }

      if(serviceType) {
        this.serviceType = serviceType;
        $("#serviceTypeSelect").val(serviceType);
      }

      if(programme) {
        this.programme = programme;
        $("#programmeSelect").val(programme);
      }

      if(studyLevel) {
        this.studyLevel = studyLevel;
        $("#studyLevelSelect").val(studyLevel);
      }

      $('select').material_select();
    });

    this.getTaxonomies();

    $('.button-collapse').sideNav({
        menuWidth: 260, // Default is 240
        edge: 'left', // Choose the horizontal origin
        closeOnClick: false // Closes side-nav on <a> clicks, useful for Angular/Meteor
      }
    );

    $(document).ready(() => {
      //Update model when select dropdowns changed
      $('select').change((e) => {
        switch (e.currentTarget.id) {
          case "lifeCycleSelect":
              this.lifeCycle = e.currentTarget.value;
            break;
          case "serviceTypeSelect":
              this.serviceType = e.currentTarget.value;
            break;
          case "programmeSelect":
              this.programme = e.currentTarget.value;
            break;
          case "studyLevelSelect":
              this.studyLevel = e.currentTarget.value;
            break;
          default:
            console.log('Error: ', e.currentTarget.id, "doesn't exist");
        }
        this.updateSubcategories();
      });
    });
  }

  updateSubcategories() {
    let subcategories = {};
    subcategories["field_research_lifecycle_stage"] = this.lifeCycle;
    subcategories["field_category"] = this.serviceType;
    subcategories["field_programme"] = this.programme;
    subcategories["field_study_level"] = this.studyLevel;
    this.searchService.updateSubcategories(subcategories);
  }
}
