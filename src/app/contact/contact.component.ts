import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {SharedDataService} from "../app.sharedData.service";

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {


  constructor(private sharedDataService: SharedDataService) {

  }

  ngOnInit() {
    this.sharedDataService.setTitle("Contact", false);
  }

}
