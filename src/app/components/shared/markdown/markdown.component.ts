import {Component, Input} from '@angular/core';
import marked from 'marked';


@Component({
  selector: 'app-markdown',
  templateUrl: './markdown.component.html',
  styleUrls: ['./markdown.component.scss']
})
export class MarkdownComponent {

  dataConverted: string;
  markedEngine = marked.setOptions({
    renderer: new marked.Renderer(),
    gfm: true,
    tables: true,
    breaks: false,
    pedantic: false,
    sanitize: true,
    smartLists: true,
    smartypants: false
  });

  constructor() {
  }

  @Input('data')

  set data(val) {

    let text = val;
    if (val === null || val === undefined) {
      text = '';
    }

    this.dataConverted = this.markedEngine.parse(text);
  }
}


