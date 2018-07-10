export interface Resource {
  id: string,
  name: string,
  accessLevels: AccessLevel[]
}

export interface AccessLevel {
  name: string,
  users: number[],
  grouperGroupId: string
}

export class Vm implements Resource {
  id;
  name;

  instance?;
  status?;

  accessLevels = [
    { name: 'Admin',  grouperGroupId: 'vmadmin', users: []},
    { name: 'User Access', grouperGroupId: 'vmuser', users: []}
  ];
}

export class Nectar implements  Resource {
  id;
  name;
  accessLevels = [
    { name: 'N/A', grouperGroupId: 'n/a', users: []} // *ToDo Update with real Nectar grouper access levels
  ];

}

export class FileShare implements Resource {
  id;
  name;

  accessLevels = [
    { name: 'Read Write', grouperGroupId: 'rw', users: []},
    { name: 'Read Only', grouperGroupId: 'ro', users: []}
  ];
}

