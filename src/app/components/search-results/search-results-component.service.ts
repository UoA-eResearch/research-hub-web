import { Injectable } from '@angular/core';
import { Page } from 'app/model/Page';
import { ListItem } from 'app/model/ListItem';
import { ResearchHubApiService, SearchResultsParams } from 'app/services/research-hub-api.service';
import { map } from 'rxjs/operators';
import { forkJoin } from 'rxjs/observable/forkJoin';
import { Subject, Observable } from 'rxjs';

@Injectable()
export class SearchResultsComponentService {

  private resultsSubject: Subject<Page<ListItem>>;
  public results : Page<ListItem>;
  public results$ : Observable<Page<ListItem>>;

  private categorySubject: Subject<Array<Object>>;
  public resultsCategories : Array<Object>;
  public resultsCategories$ : Observable<Array<Object>>;

  constructor(public apiService: ResearchHubApiService) {
    this.initialiseSubjects();
  }

  public searchWithParams(params: SearchResultsParams){
    const resultsSub = this.updateSearchResults(params)
      .subscribe(page =>
                 {
                   this.results = page;
                   this.resultsSubject.next(page);
                   resultsSub.unsubscribe();
                 }
                );
    const categorySub = this.updateSearchResultsCategories(params)
      .subscribe(categories => {
          this.resultsCategories = categories;
          this.categorySubject.next(categories);
          categorySub.unsubscribe();
        }
      );
  }

  private initialiseSubjects(){
    this.resultsSubject = new Subject<Page<ListItem>>();
    this.results$ = this.resultsSubject.asObservable();
    this.categorySubject = new Subject<Array<Object>>();
    this.resultsCategories$ = this.categorySubject.asObservable();
  }

  private updateSearchResults(params: SearchResultsParams){
    return this.apiService.getSearchResults(params);
  }

  private updateSearchResultsCategories(params: SearchResultsParams){
    const categoryList = {};
    const categoryListArray = [];
    return  this.apiService.getSearchResultsCategories(params).pipe(
      map(res => {
        for (let i = 0; i < res['content'].length; i++) {
          for (let j = 0; j < res['content'][i]['categories'].length; j++) {
            categoryList[res['content'][i]['categories'][j]] = categoryList[res['content'][i]['categories'][j]] === undefined ? 1 : categoryList[res['content'][i]['categories'][j]] + 1;
          }
        }
        // Convert JSON to array for Angular *ngFor
        for (const categoryTuple in categoryList) {
          categoryListArray.push([categoryTuple, categoryList[categoryTuple]]);
        }
        return categoryListArray;
      })
    );
  }


}
