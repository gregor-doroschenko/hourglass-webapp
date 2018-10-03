export interface Projects {
  projects: Project[];
}

export class Project {
  id: number;
  name: string;
  identifier: string;
  description: string;
  parent: Parent;
  status: number;
  created_on: Date;
  updated_on: Date;

  // unserialized properties
  color: string;
}

export interface Parent {
  id: number;
  name: string;
}
