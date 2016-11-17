import {Component, Input} from "@angular/core";

@Component({
  selector: 'stars',
  templateUrl: './stars.component.html',
  styleUrls: ['./stars.component.scss']
})
export class StarsComponent {
  @Input() stars:number;

  constructor() {

  }

  getStarIcon(index) {
    let starsCeil = Math.ceil(this.stars);

    if (index <= this.stars) {
      return 'star';
    }
    else if (index <= starsCeil && (starsCeil - this.stars) > 0.5) {
      return 'star_half';
    }
    return 'star_border'
  }
}
