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

  physical_address: string[] = PHYSICAL_ADDRESS;
  postal_address: string [] = POSTAL_ADDRESS;
  email_address: string = EMAIL_ADDRESS;
  contact_phone: string = CONTACT_PHONE;

  constructor() {}

  ngOnInit() {}



}
