import {GetResultsListItem} from "./ResultsListItemInterface";


export class Policy implements GetResultsListItem {
  id: number;
  name: string;
  description: string;
  url: string;
  type = 'policy';

  static fromObjects(objects: [Object]): Array<Policy> {
    const items = new Array<Policy>();

    if (objects !== undefined) {
      for (const object of objects) {
        items.push(Policy.fromObject(object));
      }
    }

    return items;
  }

  static fromObject(object: Object): Policy {
    const item = new Policy();

    item.id = object['id'];
    item.name = object['name'];
    item.description = object['description'];
    item.url = object['url'];

    return item;
  }

  getId(): number {
    return this.id;
  }

  getTitle(): string {
    return this.name;
  }

  getSubtitle(): string {
    return this.description;
  }

  getImage(): string {
    return undefined;
  }

  getDefaultRouterLink(): [any] {
    return undefined;
  }

  getHref(): string {
    return this.url;
  }
}
