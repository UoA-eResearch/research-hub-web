import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {CerApiService} from '../../services/cer-api.service';
import {Project, Member} from '../../model/Project';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit, OnDestroy {

  private routeParamsSub: any;

  /**
   * Project Variables
   */
  projectId: string; // Loaded from route subscription

  projectResources: string[];

  project: Project = {
    id: '',
    title: '',
    code: ''
  };

  constructor(private cerApiService: CerApiService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.routeParamsSub = this.route.params.subscribe(params => {
      this.projectId = params['projectId'];
    });

    this.getProjectDetails(this.projectId);
  }

  getProjectDetails(projectId: string) {

    // Hardcoded call
    this.cerApiService.getProjectDetailsHardcoded(projectId).subscribe(response => {
        this.projectResources = response.projectResources;
    });

    // Get Project Details
    this.cerApiService.getProjectDetails(projectId).subscribe((response: Project) => {
      // console.log('CeR API Returned: ', response);
      this.project.id = response.id;
      this.project.title = response.title;
      this.project.description = response.description;
      this.project.code = response.code;
      this.project.members = response.members;

      // Get Grouper Details
      // this.cerApiService.getProjectResources(this.project.code);

    });

  }

  ngOnDestroy() {
    this.routeParamsSub.unsubscribe();
  }

}
