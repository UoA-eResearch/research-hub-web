import {GetResultsListItem} from "./ResultsListItemInterface";
import {Person} from "./Person";
import {OrgUnit} from "./OrgUnit";
import {Policy} from "./Policy";


export class Content implements GetResultsListItem {
  id: number;
  name: string;
  summary: string;
  description: string;
  actionableInfo: string;
  additionalInfo: string;
  callToAction: string;
  image: string;
  orgUnits: Array<OrgUnit>;
  people: Array<Person>;
  policies: Array<Policy>;

  static fromObjects(objects: [Object]): Array<Content> {
    const contentItems = new Array<Content>();

    if (objects !== undefined) {
      for (const object of objects) {
        contentItems.push(Content.fromObject(object));

        contentItems.sort((a: Content, b: Content) => {
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
    content.orgUnits = OrgUnit.fromObjects(object['orgUnits']);
    content.people = Person.fromObjects(object['people']);
    content.policies = Policy.fromObjects(object['policies']);

    return content;
  }

  getMainOrgUnit(): OrgUnit {
    if (this.orgUnits.length > 0) {
      return this.orgUnits[0];
    }

    return undefined;
  }

  getTitle(): string {
    return this.name;
  }

  getSubtitle(): string {
    return this.summary;
  }

  getAvatarUrl(): string {
    return '';
  }

  getRouterLink(): [any] {
    return ['/contentDetails', this.id];
  }

  getHref(): string {
    return undefined;
  }
}
