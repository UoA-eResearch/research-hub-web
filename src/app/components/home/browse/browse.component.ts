import {Component, OnInit, Input, OnDestroy} from '@angular/core';
import {OptionsService} from 'app/services/options.service';
import {Subscription} from 'rxjs/Subscription';
import {MediaChange, ObservableMedia} from '@angular/flex-layout';
import {LayoutService} from 'app/services/layout.service';

@Component({
  selector: 'app-browse',
  templateUrl: './browse.component.html',
  styleUrls: ['./browse.component.scss']
})
export class BrowseComponent implements OnInit, OnDestroy {

  private mediaSub: Subscription;

  @Input()
  embedded = false;

  @Input()
  maxCols = 5;

  @Input()
  numCols = 4;

  constructor(public optionsService: OptionsService, private media: ObservableMedia,
              private layoutService: LayoutService) {
  }

  ngOnInit() {
    this.updateCols(this.layoutService.getMQAlias());

    this.mediaSub = this.media.subscribe((change: MediaChange) => {
      this.updateCols(change.mqAlias);
    });
  }

  updateCols(mqAlias: string) {
    const cols = this.layoutService.getNumGridCols(mqAlias);
    this.numCols = Math.min(this.maxCols, cols);
  }

  ngOnDestroy() {
    this.mediaSub.unsubscribe();
  }
}
