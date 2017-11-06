import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-research-activity',
  templateUrl: './research-activity.component.html',
  styleUrls: ['./research-activity.component.scss']
})
export class ResearchActivityComponent implements OnInit {

  static researchActivities = [
    {id: 1, name: 'Plan & Design', color:'#60388B'},
    {id: 2, name: 'Create, Collect & Capture', color:'#3097CB'},
    {id: 3, name: 'Analyze & Interpret', color:'#359737'},
    {id: 4, name: 'Publish & Report', color:'#F3961C'},
    {id: 5, name: 'Discover & Reuse', color:'#CC3333'}
  ];

  researchActivities;

  constructor() {
    this.researchActivities = ResearchActivityComponent.researchActivities;
  }

  ngOnInit() {
  }

}
