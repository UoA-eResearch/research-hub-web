import {getItemRouterLink, GetResultsListItem} from "./ResultsListItemInterface";
import {Person} from "./Person";
import {OrgUnit} from "./OrgUnit";
import {Policy} from "./Policy";
import {GuideCategory} from "./GuideCategory";


export class Content implements GetResultsListItem {
  id: number;
  name: string;
  summary: string;
  description: string;
  actionableInfo: string;
  additionalInfo: string;
  action: string;
  actionType: string;
  image: string;
  orgUnits: Array<OrgUnit>;
  people: Array<Person>;
  policies: Array<Policy>;
  guideCategories: Array<GuideCategory>;
  contentTypes: Array<any>;

  static fromObjects(objects: [Object]): Array<Content> {
    const contentItems = new Array<Content>();

    if (objects !== undefined) {
      for (const object of objects) {
        contentItems.push(Content.fromObject(object));
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
    content.action = object['action'];
    content.actionType = object['actionType'];
    content.image = object['image'];
    content.orgUnits = OrgUnit.fromObjects(object['orgUnits']);
    content.people = Person.fromObjects(object['people']);
    content.policies = Policy.fromObjects(object['policies']);
    content.guideCategories = GuideCategory.fromObjects(object['guideCategories']);
    content.contentTypes = object['contentTypes'];

    return content;
  }

  getMainOrgUnitName(): string {
    let name = '';

    if (this.orgUnits.length > 0) {
      const orgUnit = this.orgUnits[0];
      if (orgUnit.name !== undefined) {
        name = orgUnit.name;
      }
    }

    return name;
  }

  getId(): number {
    return this.id;
  }

  getType(): string {
    if (this.contentTypes) {
      const guideContentType = this.contentTypes.find((item) => {
        return item.id === 7;
      });

      if (guideContentType) {
        return 'guide';
      }
    }

    return 'content';
  }

  getTitle(): string {
    return this.name;
  }

  getSubtitle(): string {
    return this.summary;
  }

  getImage(): string {
    return this.image;
  }

  getRouterLink(): any[] {
    return getItemRouterLink(this as GetResultsListItem);
  }

  getHref(): string {
    return undefined;
  }
}
