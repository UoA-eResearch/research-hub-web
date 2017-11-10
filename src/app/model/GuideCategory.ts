import {Content} from './Content';

export interface GuideCategory {
  id: number;
  name: string;
  displayOrder: number;
  summary: string;
  description: string;
  additionalInfo: string;
  icon: string;
  contentItems: Array<Content>;
}
