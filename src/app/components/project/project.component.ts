import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

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
  projectId: number; // Loaded from route subscription
  projectTitle: string;
  projectDescription: string;
  projectResources: string[];
  projectMembers: string[];

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.routeParamsSub = this.route.params.subscribe(params => {
      this.projectId = params['projectId'];
    });

    this.getProjectDetails()
  }

  getProjectDetails() {
    this.projectTitle = 'Exterminate: A Quantitative Analysis of Dalek Speech Patterns';
    this.projectDescription = 'Using polymorphic linguistic quantum state machine learning techniques';
    this.projectResources = ['Virtual Machine', 'File Share'];
    this.projectMembers = ['Sam Kavanagh', 'Noel Zeng', 'Cameron McLean', 'Arron McLaughlin', 'Doris Jung'];
  }


  ngOnDestroy() {
    this.routeParamsSub.unsubscribe();
  }

}
