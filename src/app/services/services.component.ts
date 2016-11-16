import {Component, AfterViewInit, ViewChild} from "@angular/core";
import {OnInit} from "@angular/core";
import {SearchService} from "../app.search.service";
import {DrupalService} from "../app.drupal.service";
import {Observable} from "rxjs/Rx";
import {Router} from "@angular/router";

@Component({
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class ServicesComponent implements OnInit, AfterViewInit {
  @ViewChild('productList') productList;
  productWidth: number;
  services:Observable<Array<string>>;
  loading:boolean;

  constructor(private searchService:SearchService, private drupalService:DrupalService) {
    this.productWidth = 180;
  }

  getColClasses() {
    let productsPerRow = Math.min(Math.floor(this.productList.nativeElement.offsetWidth / this.productWidth), 12);
    let gridWidth = Math.ceil(12 / productsPerRow);
    return "s" + gridWidth + " m" + gridWidth + " l" + gridWidth;
  }

  ngOnInit() {
    this.services = this.drupalService.contentsearch('service', this.searchService.searchChange);
  }

  ngAfterViewInit() {
    window.scrollTo(0, 0);
    this.searchService.findAll();
  }
}
