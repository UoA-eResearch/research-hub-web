import {Person} from './Person';
import {OrgUnit} from './OrgUnit';
import {Policy} from './Policy';
import {GuideCategory} from './GuideCategory';


export interface Content {
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
}
