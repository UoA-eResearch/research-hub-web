/**
 * Interface representing data in the project database
 */
export interface Project {
  id: string;
  title: string;
  description?: string;
  members?: Member[];
}

export interface Member {
  id: number,
  uoaId?: string,
  fullName?: string
}
