import {AfterViewInit, OnInit} from "@angular/core";
import {Component} from "@angular/core";
import {Router, ActivatedRoute} from "@angular/router";
import {SearchService} from "../app.search.service";

@Component({
  selector: 'comming-soon',
  templateUrl: './comingSoon.component.html'
})
export class ComingSoonComponent implements OnInit, AfterViewInit {

  routeParamsSub: any;

  constructor(private router:Router, private searchService:SearchService, private route: ActivatedRoute) {

  }

  ngOnInit()
  {
    this.routeParamsSub = this.route.params.subscribe(params => {
      this.searchService.updateAllSearchParameters(undefined, {}, true);
    });
  }

  getName()
  {
    if(this.router.isActive('guides', true))
      return "guides";
    else if(this.router.isActive('policies', true))
      return "policies";
    else if(this.router.isActive('showcase', true))
      return "research projects to showcase";
    return "";
  }

  ngAfterViewInit() {
    window.scrollTo(0, 0);
  }

  ngOnDestroy() {
    this.routeParamsSub.unsubscribe();
  }
}
