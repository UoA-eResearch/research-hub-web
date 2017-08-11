import {Component, OnInit} from '@angular/core';

const PHYSICAL_ADDRESS: string [] = ['Centre for eResearch', 'Building 302, Level 5, Room 585',
  '23 Symonds Street', 'Auckland Central', 'Auckland 1010', 'New Zealand'];

const POSTAL_ADDRESS: string [] = ['Centre for eResearch', 'The University of Auckland',
  'Private Bag 92019', 'Auckland 1142', 'New Zealand'];

const EMAIL_ADDRESS = 'eresearch-support@auckland.ac.nz';

const CONTACT_PHONE = '+64 9 373 7599 ext 822231';


@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  layoutGap = '1.0em';
  layoutGapXs = '0.5em';


  physicalAddress: string[] = PHYSICAL_ADDRESS;
  postalAddress: string [] = POSTAL_ADDRESS;
  emailAddress: string = EMAIL_ADDRESS;
  contactPhone: string = CONTACT_PHONE;

  constructor() {}

  ngOnInit() {}



}
