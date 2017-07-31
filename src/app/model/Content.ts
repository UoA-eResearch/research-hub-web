import {ResultsListItem, GetResultsListItem} from "./ResultsListItemInterface";


export class Content implements GetResultsListItem {
  id: number;
  name: string;
  summary: string;
  description: string;
  actionableInfo: string;
  additionalInfo: string;
  callToAction: string;
  image: string;

  static fromObjects(objects: [Object]): Array<Content> {
    const contentItems = new Array<Content>();

    for (const object of objects) {
      contentItems.push(Content.fromObject(object));
    }

    return contentItems;
  }

  static fromObject(object: Object): Content {
    const content = new Content();

    content.id = object['id'];
    content.name = object['name'];
    content.summary = object['summary'];
    content.description = object['description'];
    content.actionableInfo = object['actionableInfo'];
    content.additionalInfo = object['additionalInfo'];
    content.callToAction = object['callToAction'];
    content.image = object['image'];

    return content;
  }

  getResultsListItem(): ResultsListItem {
    return {title: this.name, subtitle: this.summary, avatarUrl: ''} as ResultsListItem;
  }
}
