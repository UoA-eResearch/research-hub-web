import {getItemRouterLink, GetResultsListItem} from './ResultsListItemInterface';
import {Person} from './Person';
import {Content} from './Content';


export class OrgUnit implements GetResultsListItem {
  id: number;
  name: string;
  description: string;
  url: string;
  people: Array<Person>;
  contentItems: Array<Content>;

  static fromObjects(objects: [Object]): Array<OrgUnit> {
    const orgUnits = new Array<OrgUnit>();

    if (objects !== undefined) {
      for (const object of objects) {
        orgUnits.push(OrgUnit.fromObject(object));
      }
    }

    return orgUnits;
  }

  static fromObject(object: Object): OrgUnit {
    const orgUnit = new OrgUnit();

    orgUnit.id = object['id'];
    orgUnit.name = object['name'];
    orgUnit.url = object['url'];
    orgUnit.description = '';
    orgUnit.people = Person.fromObjects(object['people']);
    orgUnit.contentItems = Content.fromObjects(object['contentItems']);

    return orgUnit;
  }

  getId(): number {
    return this.id;
  }

  getType(): string {
    return 'orgUnit';
  }

  getRouterLink(): any[] {
    return getItemRouterLink(this as GetResultsListItem);
  }

  getTitle(): string {
    return this.name;
  }

  getSubtitle(): string {
    return '';
  }

  getImage(): string {
    return undefined;
  }

  getHref(): string {
    return undefined;
  }
}
