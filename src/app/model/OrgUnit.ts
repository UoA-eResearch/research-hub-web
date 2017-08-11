import {GetResultsListItem} from "./ResultsListItemInterface";
import {Person} from "./Person";
import {Content} from "./Content";


export class OrgUnit implements GetResultsListItem {
  id: number;
  name: string;
  url: string;
  people: Array<Person>;
  contentItems: Array<Content>;

  static fromObjects(objects: [Object]): Array<OrgUnit> {
    const orgUnits = new Array<OrgUnit>();

    if (objects !== undefined) {
      for (const object of objects) {
        orgUnits.push(OrgUnit.fromObject(object));
      }

      orgUnits.sort((a: OrgUnit, b: OrgUnit) => {
        if (a.name < b.name) {
          return -1;
        } else if (a.name > b.name) {
          return 1;
        } else {
          return 0;
        }
      });
    }

    return orgUnits;
  }

  static fromObject(object: Object): OrgUnit {
    const orgUnit = new OrgUnit();

    orgUnit.id = object['id'];
    orgUnit.name = object['name'];
    orgUnit.url = object['url'];
    orgUnit.people = Person.fromObjects(object['people']);
    orgUnit.contentItems = Content.fromObjects(object['contentItems']);

    return orgUnit;
  }

  getTitle(): string {
    return this.name;
  }

  getSubtitle(): string {
    return '';
  }

  getAvatarUrl(): string {
    return '';
  }

  getRouterLink(): [any] {
    return ['/orgUnitDetails', this.id];
  }

  getHref(): string {
    return undefined;
  }
}
