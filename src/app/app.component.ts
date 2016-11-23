import {Component, OnInit, ChangeDetectorRef, ApplicationRef} from '@angular/core';
import {Router, NavigationEnd} from "@angular/router";
import {SearchService} from "./app.search.service";
import {DrupalService} from "./app.drupal.service";
import {ProductService} from "./app.product.service";
import {Observable} from "rxjs/Rx";
import * as moment from 'moment';
declare var $:any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [SearchService, DrupalService, ProductService]
})
export class AppComponent implements OnInit {
  router:Router;

  lifeCycle:string = "";
  serviceType:string = "";
  programme:string = "";
  studyLevel:string = "";

  lifeCycleTerms:Observable<Array<string>>;
  serviceTypeTerms:Observable<Array<string>>;
  programmeTerms:Observable<Array<string>>;
  studyLevelTerms:Observable<Array<string>>;

  taxonomies = {research_lifecycle: "3", service_type: "2", programme: "7", study_level: "8"};

  constructor(router:Router, private searchService:SearchService, private drupalService:DrupalService) {
    this.router = router;
    //Reset all select boxes when route changes
    router.events.subscribe((val) => {
      this.refreshSelect();
    });
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
        this.refreshSelect()
      },
      err => console.error(err)
    );
  }

  refreshSelect() {
    $("select").val("");
    $('select').material_select();
  }

  getYear() {
    return moment().year();
  }

  setSearchTerm(term) {
    this.searchService.setSearchTerm(term);
  }

  isLifecycleActive() {
    return this.router.isActive('lifecycle', false) && !this.router.isActive('productList/lifecycle/productDetails', false);
  }

  isServicesActive() {
    return this.router.isActive('productList/service', false) && !this.router.isActive('productList/service/productDetails', false);
  }

  isEducationActive() {
    return this.router.isActive('productList/education', false) && !this.router.isActive('productList/education/productDetails', false);
  }

  updateSubcategories() {
    let subcategories = [];

    // if(this.isServicesActive())
    // {
    //   subcategories.push({key: "field_research_lifecycle_stage", value: this.lifeCycle});
    //   subcategories.push({key: "field_service_type", value: this.serviceType});
    // }
    // else if(this.isEducationActive() || this.isGuidesActive())
    // {
    //   subcategories.push({key: "field_research_lifecycle_stage", value: this.lifeCycle});
    //   subcategories.push({key: "field_programme", value: this.programme});
    //   subcategories.push({key: "field_study_level", value: this.studyLevel});
    // }
    // else if(this.isPoliciesActive())
    // {
    //   subcategories.push({key: "field_research_lifecycle_stage", value: this.lifeCycle});
    //   subcategories.push({key: "field_policy_area", value: this.policyArea});
    // }
    // else if(this.isLifecycleActive())
    // {
    //   subcategories.push({key: "field_research_lifecycle_stage", value: this.lifeCycle});
    //   subcategories.push({key: "field_service_type", value: this.serviceType});
    //   subcategories.push({key: "field_programme", value: this.programme});
    //   subcategories.push({key: "field_study_level", value: this.studyLevel});
    //   subcategories.push({key: "field_policy_area", value: this.policyArea});
    // }
    //
    // this.searchService.setSubcategories(subcategories);
  }

  ngOnInit() {
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
}
