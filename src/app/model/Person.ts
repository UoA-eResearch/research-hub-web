import {
  GetResultsListItem
} from "./ResultsListItemInterface";
import {OrgUnit} from "./OrgUnit";
import {MenuService} from "../menu.service";


export class Person implements GetResultsListItem {
  id: number;
  title: string;
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  jobTitle: string;
  directoryUrl: string;
  image: string;
  orgUnits: Array<OrgUnit>;
  // contentRoles: Array<ContentRole>;

  static fromObjects(objects: [Object]): Array<Person> {
    const people = new Array<Person>();

    if (objects !== undefined) {
      for (const object of objects) {
        people.push(Person.fromObject(object));
      }

      people.sort((a: Person, b: Person) => {
        if (a.getTitle() < b.getTitle()) {
          return -1;
        } else if (a.getTitle() > b.getTitle()) {
          return 1;
        } else {
          return 0;
        }
      });
    }

    return people;
  }

  static fromObject(object: Object): Person {
    const person = new Person();

    person.id = object['id'];
    person.title = object['title'];
    person.firstName = object['firstName'];
    person.lastName = object['lastName'];
    person.email = object['email'];
    person.username = object['username'];
    person.jobTitle = object['jobTitle'];
    person.directoryUrl = object['directoryUrl'];
    person.image = object['image'];
    person.orgUnits = OrgUnit.fromObjects(object['orgUnits']);
    // person.contentRoles = ContentRole.fromObjects(object['contentRoles']);

    return person;
  }

  getId(): number {
    return this.id;
  }

  getTitle(): string {
    return this.firstName + ' ' + this.lastName;
  }

  getSubtitle(): string {
    return this.jobTitle;
  }

  getImage(): string {
    return this.image;
  }

  getDefaultRouterLink(): [any] {
    return ['/people', this.id];
  }

  getHref(): string {
    return undefined;
  }
}
