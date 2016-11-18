import {Component, OnInit, ChangeDetectorRef, ApplicationRef} from '@angular/core';
import {Router, NavigationEnd} from "@angular/router";
import {SearchService} from "./app.search.service";
import {DrupalService} from "./app.drupal.service";
import {Observable} from "rxjs/Rx";
import * as moment from 'moment';
declare var $:any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [SearchService, DrupalService]
})
export class AppComponent implements OnInit {
  router:Router;
  
  basePath = "/";
  redirectHash = "";
  redirectPath;
  isLoggedIn=false;
  
  lifeCycle: string = "";
  serviceType: string = "";
  programme: string = "";
  studyLevel: string = "";
  policyArea: string = "";
    
  lifeCycleCategories: Observable<Array<string>>;
  serviceTypeCategories: Observable<Array<string>>;
  programmeCategories: Observable<Array<string>>;
  studyLevelCategories: Observable<Array<string>>;
  policyAreaCategories: Observable<Array<string>>;

  constructor(router:Router, private searchService: SearchService, private drupalService: DrupalService) {
    this.router = router;
    //Reset all select boxes when route changes
    router.events.subscribe((val) => {
      $("select").val("");
      $('select').material_select();
    });
  }
          
  populateCombos()
  {
    this.lifeCycleCategories=this.drupalService.populateTaxonomies('cat_lifecycle', this.searchService.searchChange);
    this.serviceTypeCategories=this.drupalService.populateTaxonomies('cat_service', this.searchService.searchChange);
    this.programmeCategories=this.drupalService.populateTaxonomies('cat_prog', this.searchService.searchChange);
    this.studyLevelCategories=this.drupalService.populateTaxonomies('cat_study', this.searchService.searchChange);
    this.policyAreaCategories=this.drupalService.populateTaxonomies('cat_policy', this.searchService.searchChange);
  }
  
  getYear()
   {
     return moment().year();
   }
 
  setSearchTerm(term)
  {
    this.searchService.setSearchTerm(term);
  }

  isServicesActive()
  {
    return this.router.isActive('productList/service', true);
  }

  isEducationActive()
  {
    return this.router.isActive('productList/education', true);
  }

  isGuidesActive()
  {
    return this.router.isActive('productList/guide', true);
  }

  isPoliciesActive()
  {
    return this.router.isActive('productList/policy', true);
  }
  
  isLifecycleActive()
  {
    return this.router.isActive('lifecycle', true);
  }
  
  updateSubcategories()
  {
    let subcategories = [];

    if(this.isServicesActive())
    {
      subcategories.push({key: "field_research_lifecycle_stage", value: this.lifeCycle});
      subcategories.push({key: "field_service_type", value: this.serviceType});
    }
    else if(this.isEducationActive() || this.isGuidesActive())
    {
      subcategories.push({key: "field_research_lifecycle_stage", value: this.lifeCycle});
      subcategories.push({key: "field_programme", value: this.programme});
      subcategories.push({key: "field_study_level", value: this.studyLevel});
    }
    else if(this.isPoliciesActive())
    {
      subcategories.push({key: "field_research_lifecycle_stage", value: this.lifeCycle});
      subcategories.push({key: "field_policy_area", value: this.policyArea});
    }
    else if(this.isLifecycleActive())
    {
      subcategories.push({key: "field_research_lifecycle_stage", value: this.lifeCycle});
      subcategories.push({key: "field_service_type", value: this.serviceType});
      subcategories.push({key: "field_programme", value: this.programme});
      subcategories.push({key: "field_study_level", value: this.studyLevel});
      subcategories.push({key: "field_policy_area", value: this.policyArea});
    }
    
    this.searchService.setSubcategories(subcategories);
  }

  ngOnInit() {
    console.log('init!');
    this.populateCombos();
    $('.button-collapse').sideNav({
        menuWidth: 260, // Default is 240
        edge: 'left', // Choose the horizontal origin
        closeOnClick: false // Closes side-nav on <a> clicks, useful for Angular/Meteor
      }
    );

    $(document).ready(() => {
      //Update model when select dropdowns changed
      $('select').material_select();
      $('select').change((e) => {
        switch(e.currentTarget.id) {
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
          case "policyAreaSelect":
            this.policyArea = e.currentTarget.value;
            break;
          default:
            console.log('Error: ', e.currentTarget.id, "doesn't exist");
        }
        this.updateSubcategories();
      });
    });
  }
}