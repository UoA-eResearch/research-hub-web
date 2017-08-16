import { Component, OnInit } from '@angular/core';
import {ApiService, ContentItemsSearchParams} from "../app.api.service";
import {Content} from "../model/Content";

@Component({
  selector: 'app-featured',
  templateUrl: './featured.component.html',
  styleUrls: ['./featured.component.scss']
})
export class FeaturedComponent implements OnInit {

  content: Content;

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    const searchParams = new ContentItemsSearchParams();
    searchParams.setSize(1); // we only want to find out the total number of content items so just return 1 element

    this.apiService.getContentItems(searchParams).subscribe(
      page => {
        const totalContentItems = page.totalElements;
        const contentItemIndex = Math.floor(Math.random() * (totalContentItems - 1)) + 1;
        console.log('contentItemIndex', contentItemIndex);
        this.apiService.getContentItem(contentItemIndex).subscribe(content => {
          this.content = content;
        });
      }
    );
  }

}
