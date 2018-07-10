import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {CerApiService} from '../../services/cer-api.service';
import {Project, Member} from '../../model/Project';
import {Resource, AccessLevel, FileShare, Vm} from '../../model/Resource';
import {Observable} from 'rxjs/Observable';
import {isUndefined} from "util";

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

  projectResources: Resource[] = [];

  project: Project = {
    id: '',
    title: '',
    code: ''
  };

  newUserUoaId: number;

  resourceAccessNotice: string; // String representing resource access change notices

  constructor(private cerApiService: CerApiService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.routeParamsSub = this.route.params.subscribe(params => {
      this.projectId = params['projectId'];
    });

    this.getProjectDetails(this.projectId);
  }

  getProjectDetails(projectId: string) {

    // Get Project Details
    this.cerApiService.getProjectDetails(projectId).subscribe((response: Project) => {
      // console.log('CeR API Returned: ', response);
      this.project.id = response.id;
      this.project.title = response.title;
      this.project.description = response.description;
      this.project.code = response.code;
      this.project.members = response.members;
      this.project.resources = response.resources;

      // Setup initial resource objects
      this.getResourceDetails();

      // Setup the members in each of the resources group access levels
      for (const resource of this.projectResources) {
        for (const accessLevel of resource.accessLevels) {
          this.cerApiService.getProjectResourceGroupMembers(this.project.code, accessLevel.grouperGroupId).subscribe(res => accessLevel.users = res);
        }
      }

      console.log(this.projectResources);

      this.showContent = true;
    });

  }


  // Two resources manually instantiated. *ToDo: iterate over the array passed to this method in future
  getResourceDetails() {

    const formattedResourceArray: Resource[] = [];

    // Loop over the raw response resources, and format them into the appropriate objects
    for (const resource of this.project.resources) {
      console.log('Current resource: ', resource);

      // Switch on resource service type
      switch (resource['service']['id']) {
        case 1: // Research VM
          const tmpVmResource: Vm = new Vm();
          tmpVmResource.name = resource['service']['name'];
          tmpVmResource.id = resource['id'];
          tmpVmResource.instance = resource['instance'];
          tmpVmResource.status = resource['status'];
          formattedResourceArray.push(tmpVmResource);
          break;
        case 2: // NECTAR service
          break;
        default:
          console.log('Unknown service');
      }

      console.log('formattedResourceArray: ', formattedResourceArray);
    }


    /***************************************************/
    const vmResource: Vm = new Vm();
    vmResource.name = 'Virtual Machine';
    vmResource.id = 15785;

    const fileShareResource: FileShare = new FileShare();
    fileShareResource.name = 'File Share';
    fileShareResource.id = 42864;

    this.projectResources.push(vmResource);
    this.projectResources.push(fileShareResource);

    // console.log(this.projectResources2);
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
  updateProjectResourceGroupAccess(accessLevel: AccessLevel, projectMember: Member, resource: Resource) {

    // Remove user from any existing groups from the resource
    if (this.getUserResourceAccessLevel(projectMember.uoaId, resource) !== 'No Access') {
      this.cerApiService.deleteProjectResourceGroupAccess(this.project.code,
        (<AccessLevel>this.getUserResourceAccessLevel(projectMember.uoaId, resource)).grouperGroupId,
        projectMember.uoaId).subscribe();
    }

    this.cerApiService.updateProjectResourceGroupAccess(this.project.code, accessLevel.grouperGroupId, projectMember.uoaId).subscribe(response => {
      console.log('Grouper response to add user request: ', response);
      this.resourceAccessNotice = '<h3>Success!</h3>' + projectMember.fullName + ' (<span class="infoText">' + projectMember.uoaId +
        '</span>) added to the ' + resource.name + ' (<span class="infoText">' + resource.id +
        '</span>) group ' + accessLevel.name + ' (<span class="infoText">' + accessLevel.grouperGroupId +
        '</span>)<br />Changes to the ' + resource.name + ' may take a few minutes to take effect';
    });
  }

  /**
   * Remove a project members access to a resource group
   */
  deleteProjectResourceGroupAccess(accessLevel: AccessLevel, projectMember: Member, resource: Resource) {

    this.cerApiService.deleteProjectResourceGroupAccess(this.project.code, accessLevel.grouperGroupId, projectMember.uoaId).subscribe(response => {
      console.log('Grouper response to delete user request: ', response);
      this.resourceAccessNotice = '<h3>Success!</h3>' + projectMember.fullName + ' (<span class="infoText">' + projectMember.uoaId +
        '</span>) removed from the ' + resource.name + ' (<span class="infoText">' + resource.id +
        '</span>) group ' + accessLevel.name + ' (<span class="infoText">' + accessLevel.grouperGroupId +
        '</span>)<br />Changes to the ' + resource.name + ' may take a few minutes to take effect';
    });
  }


  addProjectMember() {
    this.cerApiService.addProjectMember(this.newUserUoaId, this.project.id);
  }

  deleteProjectMember(memberId: number) {
    this.cerApiService.deleteProjectMember(memberId, this.project.id)
  }

  ngOnDestroy() {
    this.routeParamsSub.unsubscribe();
  }

}
