import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {CerApiService} from '../../services/cer-api.service';
import {Project, Member} from '../../model/Project';

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
  projectMembers: string[];

  project: Project = {
    id: '',
    title: ''
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
        this.projectResources = response.projectMembers;
        this.projectMembers = response.projectMembers;
        this.projectResources = response.projectResources;
    });

    // Actual API Call
    this.cerApiService.getProjectDetails(projectId).subscribe((response: Project) => {
      console.log(response);
      this.project.id = response.id;
      this.project.title = response.title;
      this.project.description = response.description;
      this.project.members = response.members;
    });
  }

  ngOnDestroy() {
    this.routeParamsSub.unsubscribe();
  }

}
