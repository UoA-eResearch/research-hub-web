import {Component, OnInit, ChangeDetectorRef, ApplicationRef} from '@angular/core';
import {Router, NavigationEnd} from "@angular/router";
import {SearchService} from "./app.search.service";
import {DrupalService} from "./app.drupal.service";
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
  lifeCycle: string = "";
  serviceType: string = "";
  programme: string = "";
  studyLevel: string = "";
  policyArea: string = "";

  lifeCycleCategories: String[] = ['Plan and Design', 'Create, Collect, Capture', 'Analyze and Interpret', 'Publish and Report', 'Discover and Reuse'];
  serviceTypeCategories: String[] = ['Research Computing', 'Research Data', 'Analysis and Visualisation', 'Specialised Equipment', 'Consultation Services', 'Communication and Publishing'];
  programmeCategories: String[] = ['Architectural Studies', 'Arts', 'Commerce', 'Dance Studies', 'Education',
    'Engineering', 'Fine Arts', 'Health Sciences', 'Laws', 'Medicine and Bachelor of Surgery', 'Music',
    'Nursing', 'Optometry', 'Pharmacy', 'Urban Planning', 'Property', 'Science', 'Science in Biomedical Science',
    'Social Work', 'Teaching'];
  studyLevelCategories: String[] = ['Bachelor degrees', 'Graduate diplomas', 'Diplomas',
    'Postgraduate certificates', 'Postgraduate diplomas', 'Masters degrees', 'Doctoral degrees'];
  policyAreaCategories: String[] = ['Equity', 'Finance', 'Forms', 'Health, safety and wellbeing', 'Human resources',
    'Information technology', 'Learning and teaching', 'Legislative compliance', 'Organization and governance',
    'Research', 'Policy development and review'];

  constructor(router:Router, private searchService: SearchService) {
    this.router = router;

    //Reset all select boxes when route changes
    router.events.subscribe((val) => {
      $("select").val("");
      $('select').material_select();
    });
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
    return this.router.isActive('services', true);
  }

  isEducationActive()
  {
    return this.router.isActive('education', true);
  }

  isGuidesActive()
  {
    return this.router.isActive('guides', true);
  }

  isPoliciesActive()
  {
    return this.router.isActive('policies', true);
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

    this.searchService.setSubcategories(subcategories);
  }

  ngOnInit() {
    console.log('init!');
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
