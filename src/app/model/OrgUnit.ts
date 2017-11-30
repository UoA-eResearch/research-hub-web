import {Person} from './Person';
import {Content} from './Content';

export interface OrgUnit {
  id: number;
  name: string;
  description: string;
  url: string;
  people: Array<Person>;
  contentItems: Array<Content>;
}
