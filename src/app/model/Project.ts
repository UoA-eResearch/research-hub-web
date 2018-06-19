/**
 * Interface representing data in the project database and grouper
 */

export interface Project {
  id: string;
  title: string;
  code: string;
  description?: string;
  members?: Member[];
}

export interface Member {
  id: number,
  uoaId?: number,
  fullName?: string,
  email?: string
}
