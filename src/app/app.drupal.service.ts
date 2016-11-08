import {Injectable} from '@angular/core';
import {Subject} from "rxjs/Rx";
import {Http, Response, URLSearchParams, Headers} from "@angular/http";
import {Observable} from "rxjs/Rx";

@Injectable()
export class DrupalService {
  //private rootUrl = "https://localhost:3027/";
  thisUrl = "https://researchit.cer.auckland.ac.nz/api/content";
  products: Observable<Array<string>>;
  dosearch:any;
      
  constructor(private http:Http) {
    
  }
 getparams()
 {
    return this.dosearch;
 }
 
 search(category:string, searchChange:Subject<any>, debounceDuration = 400) {
    console.log("in search");
    return searchChange
      .debounceTime(debounceDuration)
      .distinctUntilChanged()
      .switchMap(value => this.rawSearch(category, value.searchTerm, value.subcategories));
  }
      
 contentsearch(category:string, searchChange:Subject<any>, debounceDuration = 400) {
   
     return searchChange
      .debounceTime(debounceDuration)
      .distinctUntilChanged()
      .switchMap(value => this.rawContentSearch(category, value.searchTerm, value.subcategories));
  }
     
  frontsearch(category:string, searchChange:Subject<any>, debounceDuration = 400) {
    console.log("in front search");
    return searchChange
      .debounceTime(debounceDuration)
      .distinctUntilChanged()
      .switchMap(value => this.rawFrontSearch(category, value.searchTerm, value.subcategories));
  }
         
  rawSearch(category:string, term:string, subcategories:any[]) {
     this.dosearch=new URLSearchParams();
      console.log(this.dosearch);
    if (term != undefined && term.trim() != "") {
      this.dosearch.set('search_string', term);
    }
    else if (subcategories != undefined) {
      for (let subcat of subcategories) {
        if (subcat.value != "" && subcat.value != undefined)
          this.dosearch.set(subcat.key, subcat.value);
      }
    }
    let doheaders = new Headers();
    doheaders.set('Accept', 'application/json'); 
    return this.http
    .get(this.thisUrl + "?limit=10000&fields=all" , {search:this.dosearch, headers:doheaders})
    .map((response)=>response.json());

  }
  
  rawContentSearch(category:string, term:string, subcategories:any[]) {
     this.dosearch=new URLSearchParams();
    if (term != undefined && term.trim() != "") {
      this.dosearch.set('search_string', term);
    }
    else if (subcategories != undefined) {
      for (let subcat of subcategories) {
        if (subcat.value != "" && subcat.value != undefined)
          this.dosearch.set(subcat.key, subcat.value);
      }
    }
    console.log('category: '+category);
    console.log('do search: '+this.dosearch);
    
    let doheaders = new Headers();
    doheaders.set('Accept', 'application/json'); 
   if (category=='lifecycle')
   {
      return this.http
      .get(this.thisUrl + "?sort=nid&fields=all&sort_order=ASC&&limit=10000", {search:this.dosearch, headers:doheaders})
      .map((response) => this.extractData(response, category, subcategories));
    }
    else
    {
       return this.http
      .get(this.thisUrl + "?sort=nid&fields=all&sort_order=ASC&&limit=10000&type=" + category, {search:this.dosearch, headers:doheaders})
      .map((response) => this.extractData(response, category, subcategories));
    }    
  }
  
  rawFrontSearch(category:string, term:string, subcategories:any[]) {
     this.dosearch=new URLSearchParams();
    if (term != undefined && term.trim() != "") {
      this.dosearch.set('search_string', term);
    }
    else if (subcategories != undefined) {
      for (let subcat of subcategories) {
        if (subcat.value != "" && subcat.value != undefined)
          this.dosearch.set(subcat.key, subcat.value);
      }
    }
    console.log('do search'+this.dosearch);
    console.log(this.thisUrl + "?fields=all&sort_order=ASC&&limit=10000");
    let doheaders = new Headers();
    doheaders.set('Accept', 'application/json'); 
   
    return this.http
      .get(this.thisUrl + "?fields=all&sort_order=ASC&&limit=10000", {search:this.dosearch, headers:doheaders})
      .map((response) => this.cleanData(response));
  }
  private cleanData(response) {
     let res = response.json();
     let transRes = [];
     for (var i=1;i<res.length;i++) 
     {
        if(res[i]!=null)
        {
            transRes.push(res[i]);
        }
     }
     return transRes;
     }
     
    private getserviceType(subcategories)
     {
     var serviceType='';
      if (subcategories != undefined)
      {
           for (let subcat of subcategories) 
           {
            if (subcat.key=='field_service_type')
            {
                var val=subcat.value;
                console.log('subcat:' +subcat.value);
                serviceType=val.replace('and', '&').trim();
            }
           }
        }
        return serviceType;
      }
       
     private getresLifeCycle(subcategories)
     {
     var resLifeCycle='';
     var params;
      if (subcategories != undefined)
      {
           for (let subcat of subcategories) 
           {
           if (subcat.key=='field_research_lifecycle_stage')
           {
                var val=subcat.value;
                resLifeCycle=val.replace('and', '&').trim();
           }
           }
      }
      return resLifeCycle;
     }
     private getProg(subcategories)
     { 
     var prog='';
     var params;
      if (subcategories != undefined)
      {
           for (let subcat of subcategories) 
           {
           if (subcat.key=='field_programme')
           {
                var val=subcat.value;
                prog=val.replace('and', '&').trim();
           }
           }
      }
      return prog;
     }

  private getStudyLevel(subcategories)
     { 
     var studyLevel='';
     var params;
      if (subcategories != undefined)
      {
           for (let subcat of subcategories) 
           {
           if (subcat.key=='field_study_level')
           {
                var val=subcat.value;
                studyLevel=val.replace('and', '&').trim();
           }
           }
      }
      return studyLevel;
     }
     private getPolicyArea(subcategories)
     { 
     var policyArea='';
     var params;
      if (subcategories != undefined)
      {
           for (let subcat of subcategories) 
           {
           if (subcat.key=='field_policy_area')
           {
                var val=subcat.value;
                policyArea=val.replace('and', '&').trim();
           }
           }
      }
      return policyArea;
     }
  private extractData(response, category, subcategories) {
     let res = response.json();
     //let res = this.cleanData(response);
     let transRes = [];
   //  console.log('data: ', res);
   //  console.log('sub categories: ', subcategories);
   //  console.log('category: ', category);
     
     var serviceType='';
     serviceType=this.getserviceType(subcategories);
     var resLifeCycle='';
     resLifeCycle=this.getresLifeCycle(subcategories);
     var Prog='';
     Prog=this.getProg(subcategories);
     var studyLevel='';
     studyLevel=this.getStudyLevel(subcategories);
     var policyArea='';
     policyArea=this.getPolicyArea(subcategories);
     
   //  console.log('['+resLifeCycle+']');
  //   console.log('['+serviceType+']');
  //   console.log('['+Prog+']');
  //   console.log('['+studyLevel+']');
  //   console.log('['+policyArea+']');
     // If nothing selected, return all
     if ((serviceType=='' || serviceType=='Service Type')
     && (resLifeCycle=='' || resLifeCycle=='Research Lifecycle')
     && (Prog=='' || Prog=='Programme') 
     && (studyLevel=='' || studyLevel=='Study Level')
     && (policyArea=='' || policyArea=='Policy Area'))
     {
        console.log(res.slice(1,res.length));
        transRes=res.slice(1,res.length);
     }
     else
     {   
      for (var i=1;i<res.length;i++) {
      var serCounter=0;
      var resCounter=0;
      var progCounter=0;
      var studyCounter=0;
      var policyCounter=0;
  
      for(let taxon of res[i].taxonomy)
         {  console.log('taxonomy'+taxon.name);
            if (taxon.name==serviceType)
            {console.log('service type'+ taxon.name+'matched');
            serCounter++;}
            if (taxon.name==resLifeCycle)
            {console.log('life cycle'+ taxon.name+'matched');
            resCounter++;}
            if (taxon.name==Prog)
            {console.log('programme'+ taxon.name+'matched');
            progCounter++;}
            if (taxon.name==studyLevel)
            {console.log('study level '+ taxon.name+'matched');
            studyCounter++;} 
            if (taxon.name==policyArea)
            {console.log('Policy area '+ taxon.name+'matched');
            policyCounter++;}
         }
         console.log(res[i].title);
         console.log(serCounter);
         console.log(resCounter);
         if (category=='service')
         { 
            // If research life cycle selected and service Type not selected
            if ((serviceType=='' || serviceType=='Service Type')
            && (resLifeCycle!='' || resLifeCycle!='Research Lifecycle')
            && (resCounter==1))
            {
                transRes.push(res[i]);
            }
            // If research life cycle not selected and service Type is selected
            if ((serviceType!='' || serviceType!='Service Type')
            && (resLifeCycle=='' || resLifeCycle=='Research Lifecycle')
            && (serCounter==1))
            {
                transRes.push(res[i]);
            }
            // If both selected
            if ((serviceType!='' || serviceType!='Service Type')
            && (resLifeCycle!='' || resLifeCycle!='Research Lifecycle')
            && (serCounter==1)
            && (resCounter==1))
            {
                transRes.push(res[i]);
            }
         }
         if (category=='education')
         { 
            if ((resLifeCycle!='' || resLifeCycle!='Research Lifecycle')
            && (Prog =='' || Prog=='Programme')
            && (studyLevel =='' || studyLevel=='Study Level')
            && (resCounter==1))
            {
                transRes.push(res[i]);
            }
            if ((resLifeCycle=='' || resLifeCycle=='Research Lifecycle')
            && (Prog !='' || Prog!='Programme')
            && (studyLevel =='' || studyLevel=='Study Level')
            && (progCounter==1))
            {
                transRes.push(res[i]);
            }
            if ((resLifeCycle=='' || resLifeCycle=='Research Lifecycle')
            && (Prog =='' || Prog=='Programme')
            && (studyLevel !='' || studyLevel!='Study Level')
            && (studyCounter==1))
            {
                transRes.push(res[i]);
            }
            if ((resLifeCycle!='' || resLifeCycle!='Research Lifecycle')
            && (Prog !='' || Prog!='Programme')
            && (studyLevel =='' || studyLevel=='Study Level')
            && (resCounter==1)
            && (progCounter==1))
            {
                transRes.push(res[i]);
            }
            if ((resLifeCycle!='' || resLifeCycle!='Research Lifecycle')
            && (Prog =='' || Prog=='Programme')
            && (studyLevel !='' || studyLevel!='Study Level')
            && (resCounter==1)
            && (studyCounter==1))
            {
                transRes.push(res[i]);
            }
            if ((resLifeCycle=='' || resLifeCycle=='Research Lifecycle')
            && (Prog !='' || Prog!='Programme')
            && (studyLevel !='' || studyLevel!='Study Level')
            && (progCounter==1)
            && (studyCounter==1))
            {
                transRes.push(res[i]);
            }
            if ((resLifeCycle!='' || resLifeCycle!='Research Lifecycle')
            && (Prog !='' || Prog!='Programme')
            && (studyLevel !='' || studyLevel!='Study Level')
            && (resCounter==1)
            && (progCounter==1)
            && (studyCounter==1))
            {
                transRes.push(res[i]);
            }
         }
         if (category=='guide')
         { 
         console.log('resLifeCycle: '+resLifeCycle);
         console.log('program: '+Prog);
         console.log('study level: '+ studyLevel);
            if ((resLifeCycle!='' || resLifeCycle!='Research Lifecycle')
            && (Prog =='' || Prog=='Programme')
            && (studyLevel =='' || studyLevel=='Study Level')
            && (resCounter==1))
            {
                transRes.push(res[i]);
            }
            if ((resLifeCycle=='' || resLifeCycle=='Research Lifecycle')
            && (Prog !='' || Prog!='Programme')
            && (studyLevel =='' || studyLevel=='Study Level')
            && (progCounter==1))
            {
                transRes.push(res[i]);
            }
            if ((resLifeCycle=='' || resLifeCycle=='Research Lifecycle')
            && (Prog =='' || Prog=='Programme')
            && (studyLevel !='' || studyLevel!='Study Level')
            && (studyCounter==1))
            {
                transRes.push(res[i]);
            }
            if ((resLifeCycle!='' || resLifeCycle!='Research Lifecycle')
            && (Prog !='' || Prog!='Programme')
            && (studyLevel =='' || studyLevel=='Study Level')
            && (resCounter==1)
            && (progCounter==1))
            {
                transRes.push(res[i]);
            }
            if ((resLifeCycle!='' || resLifeCycle!='Research Lifecycle')
            && (Prog =='' || Prog=='Programme')
            && (studyLevel !='' || studyLevel!='Study Level')
            && (resCounter==1)
            && (studyCounter==1))
            {
                transRes.push(res[i]);
            }
            if ((resLifeCycle=='' || resLifeCycle=='Research Lifecycle')
            && (Prog !='' || Prog!='Programme')
            && (studyLevel !='' || studyLevel!='Study Level')
            && (progCounter==1)
            && (studyCounter==1))
            {
                transRes.push(res[i]);
            }
            if ((resLifeCycle!='' || resLifeCycle!='Research Lifecycle')
            && (Prog !='' || Prog!='Programme')
            && (studyLevel !='' || studyLevel!='Study Level')
            && (resCounter==1)
            && (progCounter==1)
            && (studyCounter==1))
            {
                transRes.push(res[i]);
            }
         }
         if (category=='policies')
         { 
            if ((policyArea=='' || policyArea=='Policy Area')
            && (resLifeCycle!='' || resLifeCycle!='Research Lifecycle')
            && (resCounter==1))
            {
                transRes.push(res[i]);
            }
            
            if ((policyArea!='' || policyArea!='Service Type')
            && (resLifeCycle=='' || resLifeCycle=='Research Lifecycle')
            && (policyCounter==1))
            {
                transRes.push(res[i]);
            }
            
            if ((policyArea!='' || policyArea!='Policy Area')
            && (resLifeCycle!='' || resLifeCycle!='Research Lifecycle')
            && (policyCounter==1)
            && (resCounter==1))
            {
                transRes.push(res[i]);
            }
         }
         if (category=='lifecycle')
         { 
            console.log('in lifecycle');
            if ((resLifeCycle!='' || resLifeCycle!='Research Lifecycle')
            && (serviceType=='' || serviceType=='Service Type')
            && (Prog =='' || Prog=='Programme')
            && (studyLevel =='' || studyLevel=='Study Level')
            && (resCounter==1))
            {
                transRes.push(res[i]);
            }
            if ((resLifeCycle=='' || resLifeCycle=='Research Lifecycle')
            && (serviceType!='' || serviceType!='Service Type')
            && (Prog =='' || Prog=='Programme')
            && (studyLevel =='' || studyLevel=='Study Level')
            && (serCounter==1))
            {
                transRes.push(res[i]);
            }
            if ((resLifeCycle=='' || resLifeCycle=='Research Lifecycle')
            && (serviceType=='' || serviceType=='Service Type')
            && (Prog !='' || Prog!='Programme')
            && (studyLevel =='' || studyLevel=='Study Level')
            && (progCounter==1))
            {
                transRes.push(res[i]);
            }
            if ((resLifeCycle=='' || resLifeCycle=='Research Lifecycle')
            && (serviceType=='' || serviceType=='Service Type')
            && (Prog =='' || Prog=='Programme')
            && (studyLevel !='' || studyLevel!='Study Level')
            && (studyCounter==1))
            {
                transRes.push(res[i]);
            }
            if ((resLifeCycle!='' || resLifeCycle!='Research Lifecycle')
            && (serviceType!='' || serviceType!='Service Type')
            && (Prog =='' || Prog=='Programme')
            && (studyLevel =='' || studyLevel=='Study Level')
            && (resCounter==1)
            && (serCounter==1))
            {
                transRes.push(res[i]);
            }
            if ((resLifeCycle!='' || resLifeCycle!='Research Lifecycle')
            && (serviceType!='' || serviceType!='Service Type')
            && (Prog !='' || Prog!='Programme')
            && (studyLevel =='' || studyLevel=='Study Level')
            && (resCounter==1)
            && (progCounter==1))
            {
                transRes.push(res[i]);
            }
            if ((resLifeCycle=='' || resLifeCycle=='Research Lifecycle')
            && (serviceType=='' || serviceType=='Service Type')
            && (Prog !='' || Prog!='Programme')
            && (studyLevel !='' || studyLevel!='Study Level')
            && (progCounter==1)
            && (studyCounter==1))
            {
                transRes.push(res[i]);
            }
            if ((resLifeCycle=='' || resLifeCycle=='Research Lifecycle')
            && (serviceType!='' || serviceType!='Service Type')
            && (Prog !='' || Prog!='Programme')
            && (studyLevel !='' || studyLevel!='Study Level')
            && (serCounter==1)
            && (progCounter==1)
            && (studyCounter==1))
            {
                transRes.push(res[i]);
            }
            if ((resLifeCycle!='' || resLifeCycle!='Research Lifecycle')
            && (serviceType=='' || serviceType=='Service Type')
            && (Prog !='' || Prog!='Programme')
            && (studyLevel !='' || studyLevel!='Study Level')
            && (resCounter==1)
            && (progCounter==1)
            && (studyCounter==1))
            {
                transRes.push(res[i]);
            }
            if ((resLifeCycle!='' || resLifeCycle!='Research Lifecycle')
            && (serviceType=='' || serviceType=='Service Type')
            && (Prog =='' || Prog=='Programme')
            && (studyLevel !='' || studyLevel!='Study Level')
            && (resCounter==1)
            && (studyCounter==1))
            {
                transRes.push(res[i]);
            }
            if ((resLifeCycle!='' || resLifeCycle!='Research Lifecycle')
            && (serviceType=='' || serviceType=='Service Type')
            && (Prog !='' || Prog!='Programme')
            && (studyLevel =='' || studyLevel=='Study Level')
            && (resCounter==1)
            && (progCounter==1))
            {
                transRes.push(res[i]);
            }
            if ((resLifeCycle!='' || resLifeCycle!='Research Lifecycle')
            && (serviceType!='' || serviceType!='Service Type')
            && (Prog =='' || Prog=='Programme')
            && (studyLevel !='' || studyLevel!='Study Level')
            && (resCounter==1)
            && (serCounter==1)
            && (studyCounter==1))
            {
                transRes.push(res[i]);
            }
            if ((resLifeCycle=='' || resLifeCycle=='Research Lifecycle')
            && (serviceType!='' || serviceType!='Service Type')
            && (Prog !='' || Prog!='Programme')
            && (studyLevel =='' || studyLevel=='Study Level')
            && (serCounter==1)
            && (progCounter==1))
            {
                transRes.push(res[i]);
            }
            if ((resLifeCycle=='' || resLifeCycle=='Research Lifecycle')
            && (serviceType!='' || serviceType!='Service Type')
            && (Prog =='' || Prog=='Programme')
            && (studyLevel !='' || studyLevel!='Study Level')
            && (serCounter==1)
            && (studyCounter==1))
            {
                transRes.push(res[i]);
            }
            if ((resLifeCycle!='' || resLifeCycle!='Research Lifecycle')
            && (serviceType!='' || serviceType!='Service Type')
            && (Prog !='' || Prog!='Programme')
            && (studyLevel !='' || studyLevel!='Study Level')
            && (resCounter==1)
            && (serCounter==1)
            && (progCounter==1)
            && (studyCounter==1))
            {
                transRes.push(res[i]);
            }
         }
       }
       }
       console.log(transRes);
    return transRes || { };
  }
}



