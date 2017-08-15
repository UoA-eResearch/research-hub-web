import {Component, OnInit} from '@angular/core';


@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  description = "The Centre for eResearch comprises a team of highly qualified research and technical staff dedicated " +
    "to the delivery of advanced computational solutions to help power the University's research mission.";

  constructor() {

  }

  ngOnInit() {
  }

}
