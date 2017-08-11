import { Component, OnInit } from '@angular/core';
import {ApiService} from "../app.api.service";
import {ActivatedRoute} from "@angular/router";
import {Person} from "../model/Person";


@Component({
  selector: 'app-person-details',
  templateUrl: './person-details.component.html',
  styleUrls: ['./person-details.component.scss']
})
export class PersonDetailsComponent implements OnInit {

  person: Person;

  constructor(private route: ActivatedRoute, private apiService: ApiService) {

  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const id = params['id'];

      this.apiService.getPerson(id).subscribe(
        person => {
          console.log('person', person);
          this.person = person;
        }
      );
    });
  }
}
