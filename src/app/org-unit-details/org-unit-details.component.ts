import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ApiService} from "../app.api.service";
import {OrgUnit} from "../model/OrgUnit";

@Component({
  selector: 'app-org-unit-details',
  templateUrl: './org-unit-details.component.html',
  styleUrls: ['./org-unit-details.component.scss']
})
export class OrgUnitDetailsComponent implements OnInit {

  private orgUnit: OrgUnit;

  constructor(private route: ActivatedRoute, private apiService: ApiService) {

  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const id = params['id'];

      this.apiService.getOrgUnit(id).subscribe(
        orgUnit => {
          console.log('orgUnit', orgUnit);
          this.orgUnit = orgUnit;
        }
      );
    });
  }

}
