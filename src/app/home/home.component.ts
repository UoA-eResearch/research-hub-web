import {Component, OnInit, HostListener} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {MediaChange, ObservableMedia} from '@angular/flex-layout';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  watcher: Subscription;
  activeMediaQuery = '';

  numCols: number;
  categoryItems: string[] = ['cat1', 'cat2', 'cat3', 'cat4', 'cat5', 'cat6', 'cat7'];

  constructor(media: ObservableMedia) {
    this.watcher = media.subscribe((change: MediaChange) => {
      this.activeMediaQuery = change ? `'${change.mqAlias}' = (${change.mediaQuery})` : '';
      console.log(change.mqAlias);
      this.SetNumCategoryColumns(change.mqAlias);

    });
  }

  SetNumCategoryColumns(mqAlias: string) {
    switch(mqAlias) {
      case 'xs':
        this.numCols = 2;
        break;
      case 'sm':
        this.numCols = 3;
        break;
      default:
        this.numCols = 4;
        break;
    }
    //console.log(mqAlias + ": "+this.numCols);
  }

  ngOnInit() {
    this.numCols = 4;
  }
}
