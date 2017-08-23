import {Component, Input, OnInit} from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Input()
  title: string;

  @Input()
  description: string;

  @Input()
  imageUrl: string;

  @Input()
  goHref: string;

  constructor(private titleService: Title) {

  }

  ngOnInit() {
    this.titleService.setTitle('Research Hub: ' + this.title);
  }

}
