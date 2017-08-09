import {GetResultsListItem} from "./ResultsListItemInterface";


export class OrgUnit implements GetResultsListItem {
  id: number;
  name: string;
  url: string;

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

  getRoutePath(): string {
    return '/orgUnitDetails';
  }
}
