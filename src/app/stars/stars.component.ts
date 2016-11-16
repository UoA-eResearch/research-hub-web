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
    if(index <= this.stars)
    {
      return 'star';
    }

    let remainder = 1 - index % this.stars;
    if(remainder >= 0.5)
    {
      return 'star_half'
    }

    return 'star_border'
  }
}
