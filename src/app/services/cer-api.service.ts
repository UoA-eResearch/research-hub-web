import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from 'environments/environment';
import {Observable} from 'rxjs/Observable';
import {Project, Member} from '../model/Project';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/retry';

@Injectable()
export class CerApiService {

  /**
   * Service Now Related Variables
   */
  private static requestServiceUrl = 'serviceRequest';
  private static hostname = environment.cerApiUrl;

  /**
   * Project Db Related Variables
   */
  private static projectDbHostname = 'http://130.216.216.116:8080/api/v1/';


  constructor(private http: HttpClient) {}

  /**
   * ServiceNow Related Methods Follow
   */

  requestService(serviceName: string, body: any) {
    return this.http.post(CerApiService.hostname + CerApiService.requestServiceUrl + '/' + serviceName, body);
  }

  /**
   * Project Database Related Methods Follow
   */

  // Return all projects associated with a particular netId
  getAssociatedProjects(upi: string) {
     return Observable.create(observer => {
      const projects = [
         {
           id: 'res12345',
           title: 'Exterminate: A Quantitative Analysis of Dalek Speech Patterns',
           subtitle: 'Using polymorphic linguistic quantum state machine learning techniques.',
           numAllocations: 1,
           numResearchOutputs: 2
         },
         {
           id: 'res12345',
           title: 'Tardis Percussive Maintenance',
           subtitle: 'Advanced isomorphic techniques for TARDIS telepathic circuitry maintenance.',
           numAllocations: 1,
           numResearchOutputs: 0
         },
         {
           id: 'res12345',
           title: 'Sonic Screwdrivers: A Meta-Analysis',
           subtitle: 'A systematic mapping study considering usability factors.',
           numAllocations: 1,
           numResearchOutputs: 1
         },
         {
           id: 'res12345',
           title: 'A Bounded Model of Infinite Timelines',
           subtitle: 'Time-based asymmetric linear regression.',
           numAllocations: 1,
           numResearchOutputs: 2
         }];
      observer.next(projects);
    });
  }

  getProjectDetailsHardcoded(projectId: string) {
    return Observable.create(observer =>  {
        const projectDetails = {
          id: 'res12345',
          title: 'Exterminate: A Quantitative Analysis of Dalek Speech Patterns',
          subtitle: 'Using polymorphic linguistic quantum state machine learning techniques.',
          numAllocations: 1,
          numResearchOutputs: 2,
          projectResources: ['Virtual Machine', 'File Share'],
          projectMembers: ['Sam Kavanagh', 'Noel Zeng', 'Cameron McLean', 'Arron McLaughlin', 'Doris Jung']
        };
        observer.next(projectDetails);
      });
  }

  /**
   * Gets the initial project details from project db, getNetIDs needs to be called next and passed member array
   * to get the NetIds corresponding to each project member
   * @param {string} projectId
   * @returns {Observable<{id: any; title: any; description: any; members: Member[]}>}
   */
  getProjectDetails(projectId: string) {
    return this.http.get(CerApiService.projectDbHostname + 'project/' + projectId + '?expand=services,codes,members')
      .map(response => {

        // Get User Ids
        const memberIds: Member[] = [];
        for (const memberId of response['members']['items']) {
          memberIds.push({id: memberId['person']['href'].substring(memberId['person']['href'].lastIndexOf('/') + 1)});
        }

        this.getPersonDetails(93).subscribe(res => {
          console.log(res);
        });

        return {
          id: response['id'],
          title: response['title'],
          description: response['description'],
          members: memberIds
        };
      });
  }

  getPersonDetails(memberId: number) {
    return this.http.get(CerApiService.projectDbHostname + 'person/' + memberId + '?expand=properties')
      .map(response => {
        const fullName = response['full_name'];
        const uoaId;

        const properties = response['properties']['items'];
        for (const property of properties) {
          if (property['propname'] === 'uoaid')
            console.log(property['propvalue']);
        }

        return properties['propname'];

        // return fullName;
      });
  }

  /**
   * Grouper Related Methods Follow
   */

}
