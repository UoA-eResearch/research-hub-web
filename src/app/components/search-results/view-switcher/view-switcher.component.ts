import { Component, OnInit, Input,Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'view-switcher',
  templateUrl: './view-switcher.component.html',
  styleUrls: ['./view-switcher.component.scss']
})
export class ViewSwitcherComponent implements OnInit {

  @Input()
  public showCardView : boolean;

  @Output()
  public showCardViewChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  toggleView(){
    this.showCardViewChange.emit(!this.showCardView);
  }

  constructor() { }

  ngOnInit() {
  }

}
