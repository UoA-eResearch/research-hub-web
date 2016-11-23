import {Component} from "@angular/core";
import {Router} from "@angular/router";

@Component({
  selector: 'comming-soon',
  templateUrl: './comingSoon.component.html'
})
export class ComingSoonComponent
{

  constructor(private router:Router) {

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
}
