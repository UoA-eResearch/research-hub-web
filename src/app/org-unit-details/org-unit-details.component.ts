import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ApiService} from "../app.api.service";
import {OrgUnit} from "../model/OrgUnit";
import { Location } from '@angular/common';
import {BreadcrumbService} from "ng2-breadcrumb/ng2-breadcrumb";
import {Person} from "../model/Person";


@Component({
  selector: 'app-org-unit-details',
  templateUrl: './org-unit-details.component.html',
  styleUrls: ['./org-unit-details.component.scss']
})
export class OrgUnitDetailsComponent implements OnInit {

  private orgUnit: OrgUnit;
  userSupport: Array<Person>;

  constructor(private route: ActivatedRoute, private apiService: ApiService, private breadcrumbService: BreadcrumbService, private location: Location) {

  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const id = params['id'];

      this.apiService.getOrgUnit(id).subscribe(
        orgUnit => {
          this.breadcrumbService.addFriendlyNameForRoute(this.location.path(), orgUnit.name);
          this.orgUnit = orgUnit;
        }
      );

      this.apiService.getOrgUnitUserSupport(id).subscribe(userSupport => {
        this.userSupport = userSupport;
      });
    });
  }

}
