import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {SearchService} from "./app.search.service";
import {DrupalService} from "./app.drupal.service";
declare var $:any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [SearchService, DrupalService]
})
export class AppComponent implements OnInit {
  router:Router;
  lifeCycleCategories: String[] = ['Plan and Design', 'Create, Collect, Capture', 'Analyze and Interpret', 'Publish and Report', 'Discover and Reuse'];
  lifeCycle: string = "";
  serviceTypeCategories: String[] = ['Analysis', 'Communication', 'Computing', 'Consulting', 'Data', 'Equipment', 'Publishing', 'Visualisation'];
  serviceType: string = "";


  constructor(router:Router, private searchService: SearchService) {
    this.router = router;
    console.log(this.lifeCycle);
  }

  setSearchTerm(term)
  {
    this.searchService.setSearchTerm(term);
    console.log('lifecycle: ' + this.lifeCycle)
  }

  onChange(newValue)
  {
    console.log('change!' + newValue);
  }

  ngOnInit() {
    $('.button-collapse').sideNav({
        menuWidth: 260, // Default is 240
        edge: 'left', // Choose the horizontal origin
        closeOnClick: false // Closes side-nav on <a> clicks, useful for Angular/Meteor
      }
    );



    $(document).ready(function () {
      $('select').material_select();
      $('select').change((e) => {
        console.log('select: ' + e);
        //this.lifeCycle[e.currentTarget.name] = e.currentTarget.value;
      });
    });
  }

  setActive() {

  }
}
