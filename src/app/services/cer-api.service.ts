import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
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
  private static  projectDbHttpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
    })
  };

  /**
   * Grouper Related Variables
   */
  private static grouperHostname = 'https://api.dev.auckland.ac.nz/service/regroup/v1/group/';
  private static grouperApiKey = '';
  private static  grouperHttpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'apikey': CerApiService.grouperApiKey
    })
  };

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

        // Initially get User IDs (used to make further API calls to get more information about person)
        const members: Member[] = [];
        const memberIds: number[] = [];

        const code = response['codes']['items'][0]['code'];

        for (const memberId of response['members']['items']) {
          memberIds.push(memberId['person']['href'].substring(memberId['person']['href'].lastIndexOf('/') + 1));
        }

        // Call getPersonDetails on each id, getting further details (UoA ID, full name etc)
        for (const memberId of memberIds) {
          this.getPersonDetails(memberId).subscribe(res => {
            members.push(res);
          });
        }

        return {
          id: response['id'],
          title: response['title'],
          description: response['description'],
          code: code,
          members: members
        };
      });
    }

  /**
   * Make the chain of requests required to add a user to the database
   * @param {number} uoaId
   */
  addProjectMember(uoaId: number, projectId: string) {

    // Step 1: Add person to project database
    const randomEmailAddress = Math.random().toString(36).substring(7) + '@auckland.ac.nz';
    const addUserToProjDbRequestJsonBody = {
      'email': randomEmailAddress,
      'full_name': 'Hackday Test User',
      'start_date': '2018-06-13',
      'status_id': 1
    };
    this.http.post(CerApiService.projectDbHostname + 'person', addUserToProjDbRequestJsonBody, CerApiService.projectDbHttpOptions).subscribe(addPersonResponse => {

      // Step 2: Get that new persons ID by looking up their unique email address in project db
      this.http.get<Member[]>(CerApiService.projectDbHostname + 'person', CerApiService.projectDbHttpOptions)
        .subscribe(personListResponse => {
          const newPersonId = personListResponse.filter(res => res.email === randomEmailAddress)[0].id;
          console.log('New Person Id: ', newPersonId);

          // Step 3: Add UoA ID to person
          const addUpiToProjDbPerson = {
            'propname': 'uoaid',
            'propvalue': uoaId.toString(),
            'person_id': newPersonId
          };
          this.http.post(CerApiService.projectDbHostname + 'person/' + newPersonId + '/property', addUpiToProjDbPerson, CerApiService.projectDbHttpOptions).subscribe(addUpiResponse => {
            console.log('addUpiResponse: ', addUpiResponse);

            // Step 4: Add person to project
            const addPersontoProject = {
              'person_id': newPersonId,
              'role_id': 3 // 1 = Project Admin
            };
            this.http.post(CerApiService.projectDbHostname + 'project/' + projectId + '/member', addPersontoProject, CerApiService.projectDbHttpOptions)
              .subscribe(addPersonToProjectResponse => console.log('Add person to project response: ', addPersonToProjectResponse));
          });
        });
    });
  }

  /**
   * Gets further details about a person with a given ID (e.g. UoA ID, full name etc)
   * @param {number} id
   * @returns {Observable<{id: number; fullname: any; uoaId: number}>}
   */
  getPersonDetails(id: number) {
    return this.http.get(CerApiService.projectDbHostname + 'person/' + id + '?expand=properties', CerApiService.projectDbHttpOptions)
      .map(response => {

        const fullName = response['full_name'];
        let uoaId: number;

        const properties = response['properties']['items'];
        for (const property of properties) {
          if (property['propname'] === 'uoaid') {
            uoaId = property['propvalue'];
          }
        }

        return {
          id: id,
          fullName: fullName,
          uoaId: uoaId
        };
    });
  }

  /**
   * Grouper Related Methods Follow
   */

  getProjectResources(projectCode: string, grouperGroupId: string) {
    return this.http.get(CerApiService.grouperHostname + 'cer-hackday:' + projectCode + '_' + grouperGroupId + '/member?direct=true', CerApiService.grouperHttpOptions)
      .map(response => {
        let memberIds: number[] = [];

        for (const membership of response['memberships']) {
          memberIds.push(membership['memberid']);
        }

        return memberIds;
      });
    }

  updateProjectResourceGroupAccess(projectCode: string, grouperGroupId: string, uoaId: number) {
    let newMembershipJsonBody = {
      "memberships": [
        {
          "memberid": uoaId,
          "type": "USER"
        }
      ]
    };

    console.log('membershipJsonBody: ', newMembershipJsonBody);

    return this.http.post(CerApiService.grouperHostname + 'cer-hackday:' + projectCode + '_' +  grouperGroupId + '/member', newMembershipJsonBody, CerApiService.grouperHttpOptions);
  }

  deleteProjectResourceGroupAccess(projectCode: string, grouperGroupId: string, uoaId: number) {
    return this.http.delete(CerApiService.grouperHostname + 'cer-hackday:' + projectCode + '_' +  grouperGroupId + '/member/' + uoaId, CerApiService.grouperHttpOptions);
  }
