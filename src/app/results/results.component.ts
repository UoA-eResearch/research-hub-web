import {Component, EventEmitter, HostListener, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {MdSidenav} from '@angular/material';
import {SharedDataService} from '../app.sharedData.service';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';


@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit, OnDestroy {

  @ViewChild('productGrid') productGrid;
  @ViewChild('filterSideNav') filterSideNav: MdSidenav;
  routeParamsSub: Subscription;
  productGridMargins = 0;
  productWidth = 350;
  numCols = 1;
  searchText = '';

  products = [
    {name: 'One', id: 1, category: 'Test'},
    {name: 'Two', id: 1, category: 'Test'},
    {name: 'Three', id: 1, category: 'Test'},
    {name: 'Four', id: 1, category: 'Test'},
    {name: 'Five', id: 1, category: 'Test'},
    {name: 'Six', id: 1, category: 'Test'},
    {name: 'Seven', id: 1, category: 'Test'},
    {name: 'Eight', id: 1, category: 'Test'},
    {name: 'Nine', id: 1, category: 'Test'},
    {name: 'Ten', id: 1, category: 'Test'},
    {name: 'Three', id: 1, category: 'Test'},
    {name: 'Four', id: 1, category: 'Test'},
    {name: 'Five', id: 1, category: 'Test'},
    {name: 'Six', id: 1, category: 'Test'},
    {name: 'Seven', id: 1},
    {name: 'Eight', id: 1}
  ];

  constructor(private sharedDataService: SharedDataService, private route: ActivatedRoute) {

  }

  ngOnInit() {
    this.routeParamsSub = this.route.params.subscribe(params => {
      this.searchText = params['searchText'];
      // console.log('Params', params);
    });
    this.sharedDataService.setTitle('Home', true);
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
