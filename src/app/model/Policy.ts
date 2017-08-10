import {GetResultsListItem} from "./ResultsListItemInterface";


export class Policy implements GetResultsListItem {
  id: number;
  name: string;
  description: string;
  url: string;

  static fromObjects(objects: [Object]): Array<Policy> {
    const items = new Array<Policy>();

    if (objects !== undefined) {
      for (const object of objects) {
        items.push(Policy.fromObject(object));

        items.sort((a: Policy, b: Policy) => {
          if (a.name < b.name) {
            return -1;
          } else if (a.name > b.name) {
            return 1;
          } else {
            return 0;
          }
        });
      }
    }

    return items;
  }

  static fromObject(object: Object): Policy {
    const item = new Policy();

    console.log('content', object);

    item.id = object['id'];
    item.name = object['name'];
    item.description = object['description'];
    item.url = object['url'];

    return item;
  }

  getTitle(): string {
    return this.name;
  }

  getSubtitle(): string {
    return this.description;
  }

  getAvatarUrl(): string {
    return '';
  }

  getRoutePath(): string {
    return '/policyDetails';
  }
}
