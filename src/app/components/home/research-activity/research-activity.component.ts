import {Component, OnInit} from '@angular/core';
import {OptionsService} from 'app/services/options.service';

@Component({
  selector: 'app-research-activity',
  templateUrl: './research-activity.component.html',
  styleUrls: ['./research-activity.component.scss']
})
export class ResearchActivityComponent implements OnInit {

  constructor(public optionsService: OptionsService) {

  }

  getQueryParams(activity) {
    return {researchActivityIds: [activity.id]};
  }

  ngOnInit() {
  }
}
