import { Component, OnInit } from '@angular/core';
import {CerApiService} from 'app/services/cer-api.service';
import {ResearchHubApiService} from 'app/services/research-hub-api.service';

@Component({
  selector: 'app-my-research',
  templateUrl: './my-research.component.html',
  styleUrls: ['./my-research.component.scss']
})
export class MyResearchComponent implements OnInit {

  projects: any[] = [
    {
      id: '1',
      title: 'Exterminate: A Quantitative Analysis of Dalek Speech Patterns',
      subtitle: 'Using polymorphic linguistic quantum state machine learning techniques.',
      numAllocations: 1,
      numResearchOutputs: 2
    },
    {
      id: '2',
      title: 'Tardis Percussive Maintenance',
      subtitle: 'Advanced isomorphic techniques for TARDIS telepathic circuitry maintenance.',
      numAllocations: 1,
      numResearchOutputs: 0
    },
    {
      id: '3',
      title: 'Sonic Screwdrivers: A Meta-Analysis',
      subtitle: 'A systematic mapping study considering usability factors.',
      numAllocations: 1,
      numResearchOutputs: 1
    },
    {
      id: '4',
      title: 'A Bounded Model of Infinite Timelines',
      subtitle: 'Time-based asymmetric linear regression.',
      numAllocations: 1,
      numResearchOutputs: 2
    }];

  getAssociatedProjects(userId: number) {}

  constructor(private cerApiService: CerApiService, private apiService: ResearchHubApiService) { }

  ngOnInit() {}

}
