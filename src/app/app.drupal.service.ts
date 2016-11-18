import {Injectable} from '@angular/core';
import {Subject} from "rxjs/Rx";
import {Http, Response, URLSearchParams, Headers} from "@angular/http";
import {Observable} from "rxjs/Rx";

@Injectable()
export class DrupalService {
  //private rootUrl = "https://localhost:3027/";
  thisUrl = "https://researchit.cer.auckland.ac.nz/api/content";
  vid_service=2;
  vid_lifecycle=3;
  vid_policy=4;
  vid_prog=5;
  vid_study=7;
  products: Observable<Array<string>>;
  mydata:any;
  combos: any[];
  dosearch:any;
      
 constructor(private http:Http) {
    
  }
 getparams()
 {
    return this.dosearch;
 }
 
 search(category:string, searchChange:Subject<any>, debounceDuration = 400) {
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
    return searchChange
      .debounceTime(debounceDuration)
      .distinctUntilChanged()
      .switchMap(value => this.rawFrontSearch(category, value.searchTerm, value.subcategories));
  }
         
  rawSearch(category:string, term:string, subcategories:any[]) {
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

    let doheaders = new Headers();
    doheaders.set('Accept', 'application/json'); 
   
    return this.http
      .get(this.thisUrl + "?fields=all&sort_order=ASC&&limit=10000", {search:this.dosearch, headers:doheaders})
      .map((response) => this.cleanData(response));
  }
  
  populateTaxonomies(category:string, searchChange:Subject<any>, debounceDuration = 400)
  {
    return searchChange
      .debounceTime(debounceDuration)
      .distinctUntilChanged()
      .switchMap(value => this.callPopulateTaxonomies(category, value.searchTerm, value.subcategories));
  }
  
  private callPopulateTaxonomies(category:string, term:string, subcategories:any[])
  {
    let doheaders = new Headers();
    doheaders.set('Accept', 'application/json');
    if(category=='cat_lifecycle')
    {
    return this.http
    .get(this.thisUrl + "?fields=all&sort_order=ASC&&limit=10000", {headers:doheaders})
    .map((response) => this.getLifecycleCat(response));
    }
    if(category=='cat_service')
    {
    return this.http
    .get(this.thisUrl + "?fields=all&sort_order=ASC&&limit=10000", {headers:doheaders})
    .map((response) => this.getServiceCat(response));
    }
    if(category=='cat_prog')
    {
    return this.http
    .get(this.thisUrl + "?fields=all&sort_order=ASC&&limit=10000", {headers:doheaders})
    .map((response) => this.getProgCat(response));
    }
    if(category=='cat_study')
    {
    return this.http
    .get(this.thisUrl + "?fields=all&sort_order=ASC&&limit=10000", {headers:doheaders})
    .map((response) => this.getStudyCat(response));
    }
    if(category=='cat_policy')
    {
    return this.http
    .get(this.thisUrl + "?fields=all&sort_order=ASC&&limit=10000", {headers:doheaders})
    .map((response) => this.getPolicyCat(response));
    }
  }
  
  private getLifecycleCat(response)
  {
    let res = response.json();
    let combo=[];
    let obj=[];
    for (var i=1;i<res.length;i++) 
    {
        if(res[i]!=null)
        {
            for(let taxon of res[i].taxonomy)
            {     if (taxon.vid==this.vid_lifecycle)
                  {
                    if(obj.indexOf(taxon.tid)==-1)
                    {
                    combo.push({key: taxon.tid, value: taxon.name});
                    obj.push(taxon.tid);
                    }
                  }
            }
        }
    }
    return combo;
  }
  private getServiceCat(response)
  {
    let res = response.json();
    let combo=[];
    let obj=[];
    for (var i=1;i<res.length;i++) 
    {
        if(res[i]!=null)
        {
            for(let taxon of res[i].taxonomy)
            {     if (taxon.vid==this.vid_service)
                  {
                    if(obj.indexOf(taxon.tid)==-1)
                    {
                    combo.push({key: taxon.tid, value: taxon.name});
                    obj.push(taxon.tid);
                    }
                  }
            }
        }
    }
    return combo;
  }
  private getProgCat(response)
  {
    let res = response.json();
    let combo=[];
    let obj=[];
    for (var i=1;i<res.length;i++) 
    {
        if(res[i]!=null)
        {
            for(let taxon of res[i].taxonomy)
            {     if (taxon.vid==this.vid_prog)
                  {
                    if(obj.indexOf(taxon.tid)==-1)
                    {
                    combo.push({key: taxon.tid, value: taxon.name});
                    obj.push(taxon.tid);
                    }
                  }
            }
        }
    }
    return combo;
  }
  private getStudyCat(response)
  {
    let res = response.json();
    let combo=[];
    let obj=[];
    for (var i=1;i<res.length;i++) 
    {
        if(res[i]!=null)
        {
            for(let taxon of res[i].taxonomy)
            {     if (taxon.vid==this.vid_study)
                  {
                    if(obj.indexOf(taxon.tid)==-1)
                    {
                    combo.push({key: taxon.tid, value: taxon.name});
                    obj.push(taxon.tid);
                    }
                  }
            }
        }
    }
    return combo;
  }
  private getPolicyCat(response)
  {
    let res = response.json();
    let combo=[];
    let obj=[];
    for (var i=1;i<res.length;i++) 
    {
        if(res[i]!=null)
        {
            for(let taxon of res[i].taxonomy)
            {     if (taxon.vid==this.vid_policy)
                  {
                    if(obj.indexOf(taxon.tid)==-1)
                    {
                    combo.push({key: taxon.tid, value: taxon.name});
                    obj.push(taxon.tid);
                    }
                  }
            }
        }
    }
    return combo;
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
                serviceType=subcat.value;
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
                resLifeCycle=subcat.value;
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
                prog=subcat.value;
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
                studyLevel=subcat.value;
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
                policyArea=subcat.value;
           }
           }
      }
      return policyArea;
     }
  private extractData(response, category, subcategories) {
     let res = response.json();
     let transRes = [];
     
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
     
     // If nothing selected, return all
     if ((serviceType=='')
     && (resLifeCycle=='')
     && (Prog=='') 
     && (studyLevel=='')
     && (policyArea==''))
     {
        for(var i=1;i<res.length;i++)
        {
            //transRes=res.slice(1,res.length);
            if(res[i]!=null)
            {transRes.push(res[i]);}
        }
     }
     else
     {   
      for (var i=1;i<res.length;i++) {
      if(res[i]!=null)
      {
      var serCounter=0;
      var resCounter=0;
      var progCounter=0;
      var studyCounter=0;
      var policyCounter=0;
  
      for(let taxon of res[i].taxonomy)
         {  
            if (taxon.tid==serviceType)
            {
            serCounter++;}
            if (taxon.tid==resLifeCycle)
            {
            resCounter++;}
            if (taxon.tid==Prog)
            {
            progCounter++;}
            if (taxon.tid==studyLevel)
            {
            studyCounter++;} 
            if (taxon.tid==policyArea)
            {
            policyCounter++;}
         }
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
            && (serCounter==1)
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
       }
    return transRes || { };
  }
}