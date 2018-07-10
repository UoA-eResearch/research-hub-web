/**
 * Interface representing data in the project database and grouper
 */
import {Resource} from "./Resource";

export interface Project {
  id: string;
  title: string;
  code: string;
  resources?: Resource[];
  description?: string;
  members?: Member[];
}

export interface Member {
  id: number,
  memberId?: number,
  uoaId?: number,
  fullName?: string,
  email?: string
}
