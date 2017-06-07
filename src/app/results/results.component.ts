import {Component, EventEmitter, HostListener, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {MdSidenav} from '@angular/material';
import {SharedDataService} from '../app.sharedData.service';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import {AnalyticsService} from '../app.analytics.service';
import {Location} from '@angular/common';


@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit, OnDestroy {
  title = 'Results';
  @ViewChild('productGrid') productGrid;
  @ViewChild('filterSideNav') filterSideNav: MdSidenav;
  routeParamsSub: Subscription;
  productGridMargins = 0;
  productWidth = 350;
  numCols = 1;
  searchText = '';

  products = [
    {name: 'One', id: 1, category: 'Test', abstract: 'Discover and review healthy food options in New Zealand with Foodback'},
    {name: 'Two', id: 1, category: 'Test', abstract: 'Discover and review healthy food options in New Zealand with Foodback'},
    {name: 'Three', id: 1, category: 'Test', abstract: 'Discover and review healthy food options in New Zealand with Foodback'},
    {name: 'Four', id: 1, category: 'Test', abstract: 'Discover and review healthy food options in New Zealand with Foodback'},
    {name: 'Five', id: 1, category: 'Test', abstract: 'Discover and review healthy food options in New Zealand with Foodback'},
    {name: 'Six', id: 1, category: 'Test', abstract: 'Discover and review healthy food options in New Zealand with Foodback'},
    {name: 'Seven', id: 1, category: 'Test', abstract: 'Discover and review healthy food options in New Zealand with Foodback'},
    {name: 'Eight', id: 1, category: 'Test', abstract: 'Discover and review healthy food options in New Zealand with Foodback'},
    {name: 'Nine', id: 1, category: 'Test', abstract: 'Discover and review healthy food options in New Zealand with Foodback'},
    {name: 'Ten', id: 1, category: 'Test', abstract: 'Discover and review healthy food options in New Zealand with Foodback'},
    {name: 'Three', id: 1, category: 'Test', abstract: 'Discover and review healthy food options in New Zealand with Foodback'},
    {name: 'Four', id: 1, category: 'Test', abstract: 'Discover and review healthy food options in New Zealand with Foodback'},
    {name: 'Five', id: 1, category: 'Test', abstract: 'Discover and review healthy food options in New Zealand with Foodback'},
    {name: 'Six', id: 1, category: 'Test', abstract: 'Discover and review healthy food options in New Zealand with Foodback'},
    {name: 'Seven', id: 1, category: 'Test', abstract: 'Discover and review healthy food options in New Zealand with Foodback'},
    {name: 'Eight', id: 1, category: 'Test', abstract: 'Discover and review healthy food options in New Zealand with Foodback'}
  ];

  constructor(private sharedDataService: SharedDataService, private route: ActivatedRoute, private location: Location,
              private analyticsService: AnalyticsService) {

  }

  ngOnInit() {
    this.sharedDataService.setTitle(this.title, true);
    this.routeParamsSub = this.route.params.subscribe(params => {
      this.searchText = params['searchText'];
    });

    this.updateSideNav();
    this.calcNumCols();
  }

  ngOnDestroy() {
    this.routeParamsSub.unsubscribe();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.updateSideNav();
    this.calcNumCols();
  }

  updateSideNav() {
    if (window.innerWidth >= 800) {
      this.filterSideNav.mode = 'side';
      this.filterSideNav.opened = true;
    } else {
      this.filterSideNav.mode = 'over';
      this.filterSideNav.opened = false;
    }
  }

  calcNumCols() {
    this.numCols = Math.max(1, Math.min(Math.floor((this.productGrid.nativeElement.offsetWidth -
      this.productGridMargins) / this.productWidth), 12));
  }
}
