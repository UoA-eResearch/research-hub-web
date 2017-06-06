import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import {SearchService} from '../app.search.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  searchText: string;

  constructor(private location: Location, private searchService: SearchService) { }

  ngOnInit() {
    this.searchText = this.searchService.getSearchText();
  }

  back() {
    this.location.back();
  }
}
