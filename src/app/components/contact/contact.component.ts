import {Component, OnInit} from '@angular/core';
import {AnalyticsService} from 'app/services/analytics.service';
import { Location } from '@angular/common';


@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  description = '<p></p>';

  layoutGap = '1.5em';
  layoutGapXs = '0.5em';

  physicalAddress = ['Centre for eResearch', 'Building 302, Level 5, Room 585', '23 Symonds Street', 'Auckland Central',
    'Auckland 1010', 'New Zealand'];
  postalAddress = ['Centre for eResearch', 'The University of Auckland', 'Private Bag 92019', 'Auckland 1142',
    'New Zealand'];
  emailAddress = 'eresearch-support@auckland.ac.nz';
  contactPhone = '+64 9 373 7599 ext 82231';

  constructor(private analyticsService: AnalyticsService, private location: Location) {
  }

  ngOnInit() {
    this.analyticsService.trackPageView(this.location.path(), 'Contact Us');
  }


}
