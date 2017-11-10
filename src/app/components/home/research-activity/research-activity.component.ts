import {Component, OnInit} from '@angular/core';
import {CategoryId, OptionsService} from 'app/services/options.service';

@Component({
  selector: 'app-research-activity',
  templateUrl: './research-activity.component.html',
  styleUrls: ['./research-activity.component.scss']
})
export class ResearchActivityComponent implements OnInit {

  constructor(public optionsService: OptionsService) {

  }

  getQueryParams(activity) {
    return {categoryId: CategoryId.All, researchActivityIds: [activity.id]};
  }

  ngOnInit() {
  }
}
