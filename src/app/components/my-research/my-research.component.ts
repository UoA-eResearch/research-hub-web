import { Component, OnInit } from '@angular/core';
import {CerApiService} from 'app/services/cer-api.service';
import {ResearchHubApiService} from 'app/services/research-hub-api.service';

@Component({
  selector: 'app-my-research',
  templateUrl: './my-research.component.html',
  styleUrls: ['./my-research.component.scss']
})
export class MyResearchComponent implements OnInit {

  projects: any[];

  constructor(private cerApiService: CerApiService, private apiService: ResearchHubApiService) { }

  ngOnInit() {
    this.getAssociatedProjects()
  }

  getAssociatedProjects() {
    this.cerApiService.getAssociatedProjects('skav012').subscribe(response => {
      this.projects = response;
    });
  }

}
