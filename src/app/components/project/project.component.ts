import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {CerApiService} from '../../services/cer-api.service';
import {Project, Member} from '../../model/Project';
import {Resource, AccessLevel, FileShare, Vm} from '../../model/Resource';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit, OnDestroy {

  showContent = false;

  private routeParamsSub: any;

  /**
   * Project Variables
   */
  projectId: string; // Loaded from route subscription

  projectResources: string[];

  projectResources2: Resource[] = [];

  project: Project = {
    id: '',
    title: '',
    code: ''
  };

  newUserUoaId: number;

  newUserInformation; // String representing new user information info box

  constructor(private cerApiService: CerApiService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.routeParamsSub = this.route.params.subscribe(params => {
      this.projectId = params['projectId'];
    });

    this.getProjectDetails(this.projectId);
  }

  // Two resources manually instantiated. *ToDo: iterate over the array passed to this method in future
  getResourceDetails(projectResourcesString: string[]) {

    let vmResource: Vm = new Vm();
    vmResource.name = 'Virtual Machine';
    vmResource.id = 5;

    let fileShareResource: FileShare = new FileShare();
    fileShareResource.name = 'File Share';
    fileShareResource.id = 6;

    this.projectResources2.push(vmResource);
    this.projectResources2.push(fileShareResource);

    // console.log(this.projectResources2);
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
      // this.cerApiService.getProjectResources(this.project.code, 'vmuser');

      // Setup initial resource objects
      this.getResourceDetails(this.projectResources);

      for (const resource of this.projectResources2) {
        for (let accessLevel of resource.accessLevels) {
         this.cerApiService.getProjectResources(this.project.code, accessLevel.grouperGroupId).subscribe(res =>  accessLevel.users = res);
        }
      }

      // console.log('Finished project2: ', this.projectResources2);

      this.showContent = true;
    });

  }

  /**
   * Get a users access level name for a particular resource
   * @param {number} uoaId
   * @param {Resource} resource
   */
  getUserResourceAccessLevel(uoaId: number, resource: Resource) {
     for (const accessLevel of resource.accessLevels) {
       if (accessLevel.users.indexOf(uoaId) !== -1) {
         return accessLevel;
       }
     }
     return 'No Access';
  }

  /**
   * Update a project members resource access group
   */
  updateProjectResourceGroupAccess(grouperGroupId: string, uoaId: number) {
    this.cerApiService.updateProjectResourceGroupAccess(this.project.code, grouperGroupId, uoaId).subscribe(response => {
      console.log('Grouper response to add user request: ', response);
      this.newUserInformation = '<h3>Success!</h3> User (UoA ID: <span>' + uoaId + '</span>) to group: <span>' + grouperGroupId + '</span><br />Access to the associated resource may take a few minutes';
    });
  }

  /**
   * Update a project members resource access group
   */
  deleteProjectResourceGroupAccess(grouperGroupId: string, uoaId: number) {
    this.cerApiService.deleteProjectResourceGroupAccess(this.project.code, grouperGroupId, uoaId).subscribe(response => {
      console.log('Grouper response to delete user request: ', response);
      this.newUserInformation = '<h3>Success!</h3> User (UoA ID: <span>' + uoaId + '</span>) deleted from group: <span>' + grouperGroupId + '</span><br />';
    });
  }


  addProjectMember() {
    this.cerApiService.addProjectMember(this.newUserUoaId);
  }

  ngOnDestroy() {
    this.routeParamsSub.unsubscribe();
  }

}
