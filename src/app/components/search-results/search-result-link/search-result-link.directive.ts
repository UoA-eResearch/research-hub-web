import { Directive, ElementRef, Input, AfterViewInit, HostListener } from '@angular/core';
import { ListItem } from 'app/model/ListItem';
import { AnalyticsService } from 'app/services/analytics.service';
import {ActivatedRoute} from '@angular/router';

@Directive({
    selector: '[appSearchResultLink]'
})
export class SearchResultLinkDirective implements AfterViewInit {
    @Input() item: ListItem;

    constructor(private el: ElementRef, private analyticsService: AnalyticsService, private route: ActivatedRoute) {}

    @HostListener('click') click() {
       if (this.item.type === 'policy') {
           this.analyticsService.trackPolicy(this.item.title, this.item.url);
       }
   }

    ngAfterViewInit() {
        if (this.item.type === 'policy') {
            this.el.nativeElement.href = this.item.url;
            this.el.nativeElement.target = '_blank';
        } else {
            this.el.nativeElement.href = '#/' + this.item.type + '/' + this.item.id.toString();
        }
    }
}
