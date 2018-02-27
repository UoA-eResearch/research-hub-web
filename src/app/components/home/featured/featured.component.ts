import {Component, OnInit} from '@angular/core';
import {ResearchHubApiService, ContentItemsParams} from 'app/services/research-hub-api.service';
import {Content} from 'app/model/Content';

@Component({
  selector: 'app-featured',
  templateUrl: './featured.component.html',
  styleUrls: ['./featured.component.scss']
})
export class FeaturedComponent implements OnInit {

  content: Content;

  constructor(private apiService: ResearchHubApiService) {
  }

  ngOnInit() {
    const params = new ContentItemsParams();
    params.setSize(1); // we only want to find out the total number of content items so just return 1 element

    this.apiService.getContentItems(params).subscribe(
      page => {
        const totalContentItems = page.totalElements;
        const contentItemIndex = Math.floor(Math.random() * (totalContentItems - 1)) + 1;
        this.apiService.getContent(contentItemIndex).subscribe(content => {
          this.content = content;
        });
      }
    );
  }
}
