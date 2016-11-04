import {Component, AfterViewInit, Input} from "@angular/core";
import {OnInit} from "@angular/core";
import {SearchService} from "../app.search.service";
import {DrupalService} from "../app.drupal.service";
import {Observable} from "rxjs/Rx";
import { ActivatedRoute} from '@angular/router';
import {URLSearchParams} from "@angular/http";

@Component({
  selector:'hello',
  templateUrl: './services.component.html'
})
export class ServicesComponent implements OnInit, AfterViewInit {
  services: Observable<Array<string>>;
  Urlparams:any;
  strparams:string[];
  //serCounter: number=0;
  //resCounter: number=0;
  serSelected: boolean=false;
  resSelected: boolean=false;    
  @Input() serCounter: number;  
  @Input() resCounter: number;  
        
  constructor(private searchService:SearchService, private drupalService: DrupalService, private route: ActivatedRoute) {
  
  }
  IncSerCounter()
  {
      this.serCounter++;
      this.serSelected=true;
      return this.serCounter;
  }
 IncResCounter()
  {
      this.resCounter++;
      this.resSelected=true;
      return this.resCounter;
  }
  resetCounter()
  {
      this.serCounter=0;
      this.resCounter=0;
      this.resSelected=false;
      this.serSelected=false;
  }
  getSerCounter()
  {
      return this.serCounter;
  }
  getResCounter()
  {
      return this.resCounter;
  }
  getSerSelected()
  {
      return this.serSelected;
  }
  getResSelected()
  {
      return this.resSelected;
  }   
  getresLifeCycle()
  {   var resLifeCycle:string='';
      var params:string[];
      let pars = [];
      
      this.Urlparams= this.drupalService.getparams();
      this.strparams=this.Urlparams.toString().split('&');
      if(this.strparams.length>1)
      {
        params=this.strparams[0].split('=');
        var val=params[1].replace(/%20/g, ' ');
        resLifeCycle=val.replace('and', '&').trim();
      }
      return resLifeCycle;
  }
  
  getserviceType()
  {
      var serviceType:string='';
      var params:string[];
      
      this.Urlparams= this.drupalService.getparams();
      this.strparams=this.Urlparams.toString().split('&');
      if(this.strparams.length>1)
      {
        params=this.strparams[1].split('=');
        var val=params[1].replace(/%20/g, ' ');
        serviceType=val.replace('and', '&').trim();
      }
      return serviceType;
  }
      
  ngOnInit() {
      this.services = this.drupalService.contentsearch('service', this.searchService.searchChange);
      console.log(this.services);
  }

  ngAfterViewInit()
  {
    this.searchService.findAll();
  }

  getAbstract(text) {
    var maxWords = 10;
    return text.split(" ").splice(0, maxWords).join(" ") + "...";
  }
}