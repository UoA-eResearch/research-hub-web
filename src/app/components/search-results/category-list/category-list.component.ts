import { Component, OnInit, Input, EventEmitter,Output } from '@angular/core';
import { SearchResultsComponentService } from '../search-results-component.service';
import { Observable } from 'rxjs';
import { Page } from 'app/model/Page';
import { ListItem } from 'app/model/ListItem';

@Component({
  selector: 'category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent implements OnInit {

  @Input()
  private selectedCategory = 1;
  @Output()
  public selectedCategoryChange: EventEmitter<Object> = new EventEmitter<Object>();

  private results$ : Observable<Page<ListItem>>;
  private resultsCategories$ : Observable<Array<Object>>;

  constructor(private componentService: SearchResultsComponentService) {
  }

  onCategorySelected(selectedCategory){
    this.selectedCategoryChange.emit(selectedCategory);
  }

  isCurrentCategory(categoryId){
    return this.selectedCategory === categoryId;
  }

  ngOnInit() {
    this.results$ = this.componentService.results$;
    this.resultsCategories$ = this.componentService.resultsCategories$;
  }

}
