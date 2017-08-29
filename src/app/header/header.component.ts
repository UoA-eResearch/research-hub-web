import {Component, Input, OnInit} from '@angular/core';
import { Title } from '@angular/platform-browser';
import {AnalyticsService} from "../app.analytics.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Input()
  title: string;

  @Input()
  description: string;

  @Input()
  imageUrl: string;

  @Input()
  goHref: string;

  @Input()
  goEventCategory: string;

  constructor(private titleService: Title, private analyticsService: AnalyticsService) {

  }

  trackGo() {
    this.analyticsService.trackGo(this.goEventCategory, this.title, this.goHref);
  }

  ngOnInit() {
    this.titleService.setTitle('Research Hub: ' + this.title);
  }

}
