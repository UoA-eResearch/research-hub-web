import {ContentType} from './ContentType';


export interface ListItem {
  id: number;
  type: string;
  title: string;
  subtitle: string;
  image: string;
  url: string;
  categories: Array<ContentType>;
}

