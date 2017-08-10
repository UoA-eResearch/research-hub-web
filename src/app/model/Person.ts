import {
  GetResultsListItem
} from "./ResultsListItemInterface";


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

    return person;
  }

  getTitle(): string {
    return this.firstName + ' ' + this.lastName;
  }

  getSubtitle(): string {
    return this.jobTitle;
  }

  getAvatarUrl(): string {
    return '';
  }

  getRoutePath(): string {
    return '/personDetails';
  }
}
