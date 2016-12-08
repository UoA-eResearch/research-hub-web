import {Component, OnInit, ChangeDetectorRef, ApplicationRef} from '@angular/core';
import {Router, NavigationEnd, Event} from "@angular/router";
import {SearchService} from "./app.search.service";
import {DrupalService} from "./app.drupal.service";
import {ProductService} from "./app.product.service";
import {Observable} from "rxjs/Rx";
import * as moment from 'moment';
declare var $:any;
declare let _gaq:any;
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
  goingBack: boolean = false;

  lifeCycleTerms:Observable<Array<string>>;
  serviceTypeTerms:Observable<Array<string>>;
  programmeTerms:Observable<Array<string>>;
  studyLevelTerms:Observable<Array<string>>;

  taxonomies = {research_lifecycle: "3", service_type: "2", programme: "7", study_level: "8"};

  constructor(private router:Router, private searchService:SearchService, private drupalService:DrupalService, private location: Location) {
    this.router.events.subscribe(
      (event: Event) => {
        if (event instanceof NavigationEnd) {
          if(this.goingBack && event.urlAfterRedirects.startsWith("/home"))
          {
            this.goingBack = false;
            return;
          }
          
          _gaq.push(['_setAccount', 'UA-77710107-2']);
          _gaq.push(['_trackPageview', AppComponent.formatPageName(event.urlAfterRedirects)]);
        }
      });
  }

  static formatPageName(url)
  {
    if(url.startsWith("/lifecycle") && !url.includes("productDetails"))
    {
      return "/lifecycle";
    }

    return url;
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

  setSearchTerm(term)
  {
    if(term != "" && this.router.isActive('home', true))
    {
      this.router.navigate(['home/search']);
    }
    this.searchService.setSearchTerm(term);
  }

  getSecondaryMenuClass()
  {
    if(this.router.isActive('home', true) || this.router.isActive('showcase', true) || this.router.isActive('policies', true) || this.router.isActive('guides', true))
      return "secondary-menu-bar";
    return "";
  }

  back()
  {
    if(this.router.isActive('home/search', true)) {
      this.router.navigate(['/']);
    }
    else {
      this.goingBack = true;
      this.location.back();
    }
  }

  showBackBtn() {
    return this.isProductDetailsActive() || this.router.isActive('home/search', true);
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

      if(!this.router.isActive('home/search', true)) {
        //Reset search box
        $("#search").val("");
        this.setSearchTerm("");
      }

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

  trackFeedback()
  {
    _gaq.push(['_setAccount', 'UA-77710107-2']);
    _gaq.push(['_trackEvent', 'feedback', 'clicked'])
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
